import sys
import os
import cv2
import numpy as np


def adjust_brightness_contrast_gamma(image, alpha, beta, gamma):
    # Adjust brightness and contrast
    adjusted_image = cv2.convertScaleAbs(image, alpha=alpha, beta=beta)

    # Adjust gamma
    adjusted_gamma_image = np.power(
        (adjusted_image / 255.0), (1.0 / gamma)) * 255
    adjusted_gamma_image = np.clip(
        adjusted_gamma_image, 0, 255).astype(np.uint8)

    return adjusted_gamma_image


def find_blob_properties(image):
    try:
        # Find contours of the blobs
        contours, hierarchy = cv2.findContours(
            image=image, mode=cv2.RETR_TREE, method=cv2.CHAIN_APPROX_NONE)

        # image_copy = image.copy()
        image_copy = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
        cv2.drawContours(image=image_copy, contours=contours, contourIdx=-1,
                         color=(0, 255, 0), thickness=2, lineType=cv2.LINE_AA)

        # Calculate areas of the contours
        contour_areas = [cv2.contourArea(contour) for contour in contours]

        # Sort contours based on areas
        # sorted_contours = [contour for _, contour in sorted(zip(contour_areas, contours))]
        sorted_contours = sorted(
            contours, key=lambda contour: cv2.contourArea(contour))

        # Remove the contours with the two largest areas
        if len(sorted_contours) >= 2:
            sorted_contours = sorted_contours[:-2]

        blob_properties = []

        for contour in sorted_contours:
            # Calculate area of the blob
            area = cv2.contourArea(contour)

            # Calculate moments to find centroid
            moments = cv2.moments(contour)
            if moments["m00"] != 0:
                centroid_x = int(moments["m10"] / moments["m00"])
                centroid_y = int(moments["m01"] / moments["m00"])
            else:
                centroid_x = -1
                centroid_y = -1

            # Find the leftmost and topmost pixel within the contour
            leftmost = tuple(contour[contour[:, :, 0].argmin()][0])
            bottommost = tuple(contour[contour[:, :, 1].argmax()][0])
            # blob_properties.append([*calculate_centroid(contour), area])
            blob_properties.append([leftmost[0], bottommost[1], area])

        return blob_properties, image_copy
    except Exception as e:
        return f"Error generated in find_blob_properties function: {str(e)}"


def compute_closing_kernel_size(contour_count_initial):
    # Define the values for contour_count_initial where you have determined good closing_kernel_size values
    known_contour_counts = [1, 9]  # Add more values as needed
    # Corresponding closing_kernel_size values
    corresponding_kernel_sizes = [45, 15]

    # Perform linear interpolation to compute the closing_kernel_size
    closing_kernel_size = np.interp(
        contour_count_initial, known_contour_counts, corresponding_kernel_sizes)

    return int(closing_kernel_size)
# def calculate_centroid(contour):
    moments = cv2.moments(contour)
    centroid_x = int(moments["m10"] / moments["m00"])
    centroid_y = int(moments["m01"] / moments["m00"])
    return centroid_x, centroid_y
# def calculate_average_distance(blob_properties):
    num_blobs = len(blob_properties)
    total_distance = 0

    for i in range(num_blobs):
        for j in range(i + 1, num_blobs):
            centroid_i = (blob_properties[i][0], blob_properties[i][1])
            centroid_j = (blob_properties[j][0], blob_properties[j][1])
            distance = np.sqrt(
                (centroid_i[0] - centroid_j[0])**2 + (centroid_i[1] - centroid_j[1])**2)
            total_distance += distance

    average_distance = total_distance / \
        (num_blobs * (num_blobs - 1) / 2)  # Average over all pairs
    return average_distance


def machine_vision_functions(path_image, path_mask, write_path):
    ''' 
    This function will return the count of birds detected. The results will 
    appear in the output section within LabVIEW labeled return value 2.

    If there is an error that message will appear in return value 2.
    The user must load this function name into LabVIEW input area labeled "function name" as follows:
    - machine_vision_functions

    LabVIEW will then call this function which uses the three functions above:
     - compute_closing_kernel_size
     - find_blob_properties
     - adjust_brightness_contrast_gamma
    '''
    try:
        # check if initial image path is correct
        if not os.path.isfile(path_image):
            return f"Image name or file path is not correct: {path_image}"

        # check if the mask name and path to is correct
        if not os.path.isfile(path_mask):
            return f"Mask name or file path is not correct: {path_mask}"

        # check if the image write to path is valid
        if not os.path.isdir(write_path):
            return f"The path to save the image to is not valid: {write_path}"

        # Replace 'original_image.jpg'   with the path to your original image
        original_image = cv2.imread(path_image)

        # Load the mask image where the top half is white and the bottom half is black
        # Replace  'mask_image.jpg' with the path to  your mask image
        mask_image = cv2.imread(path_mask, cv2.IMREAD_GRAYSCALE)

        # Resize the mask image to match the dimensions of the original image
        mask = cv2.resize(
            mask_image, (original_image.shape[1], original_image.shape[0]))

        # Invert the mask to get the desired mask (sky in white, ground in black)
        # mask = cv2.bitwise_not(mask_image)

        # Convert the mask to a 3-channel mask
        mask_3channel = cv2.merge([mask, mask, mask])

        # Combine the original image and the mask
        filter1_result = cv2.bitwise_and(original_image, mask_3channel)

        filter1_result = cv2.cvtColor(filter1_result, cv2.COLOR_BGR2RGB)

        # split the image into its three channels
        (R, G, B) = cv2.split(filter1_result)

        filter2_result = B

        alpha = 1.5369
        beta = 6.7223
        gamma = 0.560613

        # Used the added weighting function in OpenCV to compute the assigned values together

        filter3_result = adjust_brightness_contrast_gamma(
            filter2_result, alpha, beta, gamma)
        # block_size = 5
        # constant = 7
        ret, filter4_result = cv2.threshold(
            filter3_result, 128, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        # filter4_result = cv2.adaptiveThreshold(filter3_result, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.   THRESH_BINARY_INV, block_size, constant)

        # count the number of contours to decide the value of 'closing_kernel_size'
        try:
            contour_count_initial, _ = find_blob_properties(filter4_result)
        except:
            error_msg = find_blob_properties(filter4_result)
            return error_msg

        opening_kernel_size = 2  # Adjust based on the size of noise/small blocks
        closing_kernel_size = compute_closing_kernel_size(
            len(contour_count_initial))
        # closing_kernel_size = 45  # Adjust based on the size of blobs to be merged
        # Create kernels for opening and closing operations
        opening_kernel = np.ones(
            (opening_kernel_size, opening_kernel_size), np.uint8)
        closing_kernel = np.ones(
            (closing_kernel_size, closing_kernel_size), np.uint8)

        # Apply opening to remove noise and small blocks
        opened_image = cv2.morphologyEx(
            filter4_result, cv2.MORPH_OPEN, opening_kernel)

        # Apply closing to merge blobs
        merged_blobs_image = cv2.morphologyEx(
            opened_image, cv2.MORPH_CLOSE, closing_kernel)

        # Filter 6 Particle Analysis - blob detection - contour detection

        # Find blob properties
        try:
            blob_properties, contours_image = find_blob_properties(
                merged_blobs_image)
        except:
            error_msg_merged = find_blob_properties(merged_blobs_image)
            return error_msg_merged

        # average_distance = calculate_average_distance(blob_properties)
        write_filename = "output_image.jpg"
        write_filename2 = "contours.jpg"
        write_path_and_filename = write_path + "/" + write_filename
        write_path_and_filename2 = write_path + "/" + write_filename2
        # Save the resulting image
        cv2.imwrite(write_path_and_filename, merged_blobs_image)
        cv2.imwrite(write_path_and_filename2, contours_image)

        return (str(len(blob_properties)))
    except Exception as e:
        return (str(e))
