import cv2
import numpy as np

# 拾取的未旋轉地圖坐標 (x, y)
picked_coords = {
    "f2": (43.0, 89.1),  # 迷離大宅
    "f3": (67.1, 14.5),  # 鐵甲奇俠
    "f4": (60.8, 27.0),  # 蟻俠黃蜂
    "f1": (12.6, 38.5),  # 魔雪奇幻
    "f7": (50.3, 66.2),  # 森林河流
    "s5": (49.2, 38.5),  # 奇妙夢想城堡
    "s3": (33.5, 19.2),  # 迪士尼故事劇場
    "a1": (77.6, 54.2),  # 原野劇場
}

# 讀取已旋轉的地圖 (740x865)
img_buf = np.fromfile('地圖.png', dtype=np.uint8)
img = cv2.imdecode(img_buf, cv2.IMREAD_COLOR)
h, w, c = img.shape

# 變換並繪製標記
for key, (x_pick, y_pick) in picked_coords.items():
    # 數學變換: x_new = 100 - y_pick, y_new = x_pick
    x_new = 100.0 - y_pick
    y_new = x_pick
    
    px = int(w * (x_new / 100.0))
    py = int(h * (y_new / 100.0))
    
    cv2.circle(img, (px, py), 8, (0, 255, 0), -1)
    cv2.circle(img, (px, py), 10, (255, 255, 255), 2)
    cv2.putText(img, key, (px + 12, py + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 4)
    cv2.putText(img, key, (px + 12, py + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
    print(f"{key}: pick=({x_pick}, {y_pick}) -> new=({x_new:.1f}, {y_new:.1f})")

# 保存圖片
_, img_encode = cv2.imencode('.png', img)
img_encode.tofile('rotated_marked_test_map.png')
print("Rotated marked map saved successfully.")
