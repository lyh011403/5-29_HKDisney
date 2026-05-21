import cv2
import numpy as np

# 讀取地圖圖片（處理非 ASCII 字元路徑）
img_buf = np.fromfile('地圖.png', dtype=np.uint8)
img = cv2.imdecode(img_buf, cv2.IMREAD_COLOR)
h, w, c = img.shape

# 繪製網格
for i in range(1, 10):
    # 垂直線
    x = int(w * (i / 10))
    cv2.line(img, (x, 0), (x, h), (0, 0, 255), 2)
    cv2.putText(img, f"{i*10}%", (x + 5, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
    
    # 水平線
    y = int(h * (i / 10))
    cv2.line(img, (0, y), (w, y), (0, 0, 255), 2)
    cv2.putText(img, f"{i*10}%", (10, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

# 保存圖片（處理非 ASCII 字元路徑）
_, img_encode = cv2.imencode('.png', img)
img_encode.tofile('grid_map.png')
print(f"Grid map saved successfully: {w}x{h}")
