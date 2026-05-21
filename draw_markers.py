import cv2
import numpy as np

# 景點資料
park_data = [
  { "id": "s1", "title": "森林小天地", "x": 27.9, "y": 30.0 },
  { "id": "s2", "title": "魔海奇緣", "x": 49.8, "y": 54.1 },
  { "id": "s3", "title": "StellaLou", "x": 70.9, "y": 27.8 },
  { "id": "s4", "title": "巡遊派對", "x": 49.8, "y": 78.0 },
  { "id": "s5", "title": "城堡派對", "x": 49.8, "y": 50.9 },
  { "id": "s6", "title": "星空派對", "x": 49.8, "y": 50.9 },
  { "id": "f1", "title": "魔雪奇幻", "x": 14.9, "y": 38.9 },
  { "id": "f2", "title": "迷離大宅", "x": 42.0, "y": 90.3 },
  { "id": "f3", "title": "鐵甲奇俠", "x": 79.9, "y": 45.0 },
  { "id": "f4", "title": "蟻俠黃蜂", "x": 67.9, "y": 48.0 },
  { "id": "f5", "title": "米奇幻想", "x": 52.8, "y": 35.0 },
  { "id": "f6", "title": "小熊維尼", "x": 61.8, "y": 36.9 },
  { "id": "f7", "title": "森林河流", "x": 49.8, "y": 65.0 },
  { "id": "f8", "title": "童話園林", "x": 61.8, "y": 24.9 },
  { "id": "f9", "title": "動畫教室", "x": 49.8, "y": 81.9 },
  { "id": "a1", "title": "獅子王", "x": 31.0, "y": 62.8 },
  { "id": "a2", "title": "魔法書房", "x": 70.9, "y": 27.8 }
]

# 讀取地圖
img_buf = np.fromfile('地圖.png', dtype=np.uint8)
img = cv2.imdecode(img_buf, cv2.IMREAD_COLOR)
h, w, c = img.shape

# 繪製標記
for item in park_data:
    x = int(w * (item["x"] / 100.0))
    y = int(h * (item["y"] / 100.0))
    # 畫圓
    cv2.circle(img, (x, y), 8, (0, 0, 255), -1)
    cv2.circle(img, (x, y), 10, (255, 255, 255), 2)
    # 寫 ID
    cv2.putText(img, item["id"], (x + 12, y + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 4)
    cv2.putText(img, item["id"], (x + 12, y + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)

# 保存圖片
_, img_encode = cv2.imencode('.png', img)
img_encode.tofile('marked_test_map.png')
print("Marked map saved successfully.")
