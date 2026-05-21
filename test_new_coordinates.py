import cv2
import numpy as np

# 新的旋轉後坐標 (x, y)
park_data_new = [
  { "id": "s1", "title": "森林小天地", "x": 65.0, "y": 8.0 },
  { "id": "s2", "title": "魔海奇緣", "x": 51.1, "y": 46.9 },
  { "id": "s3", "title": "StellaLou", "x": 80.8, "y": 33.5 },
  { "id": "s4", "title": "巡遊派對", "x": 59.1, "y": 70.1 },
  { "id": "s5", "title": "城堡派對", "x": 55.0, "y": 54.0 },
  { "id": "s6", "title": "星空派對", "x": 55.0, "y": 51.0 },
  { "id": "f1", "title": "魔雪奇幻", "x": 61.5, "y": 12.6 },
  { "id": "f2", "title": "迷離大宅", "x": 11.0, "y": 43.0 },
  { "id": "f3", "title": "鐵甲奇俠", "x": 85.5, "y": 67.1 },
  { "id": "f4", "title": "蟻俠黃蜂", "x": 73.0, "y": 60.8 },
  { "id": "f5", "title": "米奇幻想", "x": 60.0, "y": 45.1 },
  { "id": "f6", "title": "小熊維尼", "x": 69.9, "y": 51.0 },
  { "id": "f7", "title": "森林河流", "x": 33.8, "y": 50.3 },
  { "id": "f8", "title": "童話園林", "x": 68.9, "y": 41.5 },
  { "id": "f9", "title": "動畫教室", "x": 62.0, "y": 85.1 },
  { "id": "a1", "title": "獅子王", "x": 45.8, "y": 77.6 },
  { "id": "a2", "title": "魔法書房", "x": 83.5, "y": 31.5 }
]

# 讀取地圖
img_buf = np.fromfile('地圖.png', dtype=np.uint8)
img = cv2.imdecode(img_buf, cv2.IMREAD_COLOR)
h, w, c = img.shape

# 繪製標記
for item in park_data_new:
    x = int(w * (item["x"] / 100.0))
    y = int(h * (item["y"] / 100.0))
    # 畫圓
    cv2.circle(img, (x, y), 8, (0, 255, 0), -1)
    cv2.circle(img, (x, y), 10, (255, 255, 255), 2)
    # 寫 ID
    cv2.putText(img, item["id"], (x + 12, y + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 4)
    cv2.putText(img, item["id"], (x + 12, y + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)

# 保存圖片
_, img_encode = cv2.imencode('.png', img)
img_encode.tofile('final_marked_map.png')
print("Final marked map saved successfully.")
