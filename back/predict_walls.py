import cv2
import matplotlib.pyplot as plt


# Beispiel 1
START_THRESHOLD = 240
CONTINUE_THRESOLD = 240
EXTENSION_STEP_SIZE = 2
WINDOW_SIZE = 4
MIN_LENGTH = 40

def predict_walls(image_path, show_result=True):
    image = cv2.imread(image_path)
    _, image = cv2.threshold(image, 127, 255, cv2.THRESH_TOZERO) 
    original_image = image.copy()
    image_box_cutout = image.copy()
    # Check if the image was successfully loaded
    if image is None:
        print("Error: Could not read the image.")
        exit(0)

    print("Image loaded successfully.")

    # def try_building_wall_in_direction(image, x, y, angle):
    #     extended_columns = 0
    #     while y + extended_columns + WINDOW_SIZE < height:
    #         totalPixelValues = 0
    #         for row_offset in range(extended_columns):
    #             # add this row to total
    #             x_to_start_at = int(x + row_offset / tan(angle))
    #             totalPixelValues += sum(sum(image[y + row_offset, x_to_start_at:x_to_start_at + WINDOW_SIZE]))
    #         average_pixel_value = totalPixelValues / (WINDOW_SIZE * (extended_columns + 1))
    #         if average_pixel_value > CONTINUE_THRESOLD:
    #             break
    #         extended_columns += EXTENSION_STEP_SIZE
    #     if extended_columns >= MIN_LENGTH - WINDOW_SIZE:
    #         print(f"CREATE A BOX -> DIAGONAL")

    # Get the dimensions of the image
    height, width, _ = image.shape

    walls = []
    for y in range(0, height, WINDOW_SIZE):
        for x in range(0, width, WINDOW_SIZE):
            # Extract the batch
            batch = image[y:y+WINDOW_SIZE, x:x+WINDOW_SIZE]
            

            # Calculate the average pixel value of the batch
            avg_pixel_value = batch.mean()
            if avg_pixel_value >= START_THRESHOLD:
                # image[y:y+batch_size, x:x+batch_size] = [0, 0, 0]
                continue


            # try extending box horizontally
            extended_rows = 0
            while x + WINDOW_SIZE + extended_rows < width:
                startX = x + WINDOW_SIZE + extended_rows - EXTENSION_STEP_SIZE
                new_row = image[y:y+WINDOW_SIZE, startX:startX + EXTENSION_STEP_SIZE]
                new_average = new_row.mean()
                if new_average > CONTINUE_THRESOLD:
                    break

                extended_rows += EXTENSION_STEP_SIZE
            
            if extended_rows >= MIN_LENGTH - WINDOW_SIZE:
                x1 = x 
                y1 = y 
                x2 = x + WINDOW_SIZE + extended_rows
                y2 = y + WINDOW_SIZE
                print(f"CREATE A BOX FROM ({x1}, {y1}) to ({x2}, {y2}) -> HORIZONTAL")
                image[y1:y2, x1:x2] = [255, 255, 255]
                original_image[y1:y2, x1:x2] = [255, 0, 0]
                mid_y = (y1 + y2) / 2.
                walls.append([[x1, mid_y], [x2, mid_y]])

            # try extending box vertically
            extended_cols = 0
            while y + WINDOW_SIZE + extended_cols < height:
                startY = y + WINDOW_SIZE + extended_cols - EXTENSION_STEP_SIZE
                new_col = image[startY:startY+EXTENSION_STEP_SIZE, x:x+WINDOW_SIZE]
                new_average = new_col.mean()
                if new_average > CONTINUE_THRESOLD:
                    break

                extended_cols += EXTENSION_STEP_SIZE
            
            if extended_cols >= MIN_LENGTH - WINDOW_SIZE:
                x1 = x 
                y1 = y 
                x2 = x + WINDOW_SIZE
                y2 = y + WINDOW_SIZE + extended_cols
                print(f"CREATE A BOX FROM ({x1}, {y1}) to ({x2}, {y2}) -> VERTICAL")
                image[y1:y2, x1:x2] = [255, 255, 255]
                original_image[y1:y2, x1:x2] = [255, 0, 0]

                mid_x = (x1 + x2) / 2.
                walls.append([[mid_x, y1], [mid_x, y2]])
            
    if show_result:
        f, axarr = plt.subplots(1,1)
        # displaying image
        axarr.imshow(original_image)
        plt.show()
    
    # off_x = width/8.8
    # off_y = height/7.5
    # fac_x = 1.05
    # fac_y = 1.05
    
    # for wall in walls:
    #     wall[0][0] += off_x
    #     wall[0][1] += off_y
    #     wall[1][0] += off_x
    #     wall[1][1] += off_y
    #     wall[0][0] *= fac_x
    #     wall[0][1] *= fac_y
    #     wall[1][0] *= fac_x
    #     wall[1][1] *= fac_y

# insaner sinnvoller elegeanter Fix
# it just works

    return walls

if __name__ == '__main__':
    predict_walls('/documents/Random/JunctionHackathon/HassosHussler/back/algorithm/floor_6.png', show_result=True)