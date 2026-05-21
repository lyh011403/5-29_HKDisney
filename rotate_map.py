import cv2
import numpy as np

# 讀取地圖（處理非 ASCII 路徑）
img_buf = np.fromfile('地圖.png', dtype=np.uint8)
img = cv2.imdecode(img_buf, cv2.IMREAD_COLOR)

# 順時針旋轉 90 度
rotated_img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)

# 寫回地圖（處理非 ASCII 路徑）
_, img_encode = cv2.imencode('.png', rotated_img)
img_encode.tofile('地圖.png')
print(f"Map rotated 90 degrees clockwise. New dimensions: {rotated_img.shape[1]}x{rotated_img.shape[0]}")
