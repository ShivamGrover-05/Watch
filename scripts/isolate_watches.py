import os
from PIL import Image
import rembg

os.makedirs("public/images", exist_ok=True)

watches = [
    {
        "name": "aurelia",
        "inputs": ["public/images/watch_glacier.jpg", "public/images/watch_dark_aurelia.jpg"],
        "output": "public/images/watch_aurelia_transparent.png"
    },
    {
        "name": "nocturne",
        "inputs": ["public/images/watch_nocturne.jpg", "public/images/watch_dark_nocturne.jpg"],
        "output": "public/images/watch_nocturne_transparent.png"
    },
    {
        "name": "chronos",
        "inputs": ["public/images/watch_solstice.jpg", "public/images/watch_dark_chronos.jpg"],
        "output": "public/images/watch_chronos_transparent.png"
    },
    {
        "name": "eclipse",
        "inputs": ["public/images/watch_eclipse.jpg", "public/images/watch_dark_eclipse.jpg"],
        "output": "public/images/watch_eclipse_transparent.png"
    },
]

session = rembg.new_session("u2net")

for item in watches:
    input_path = None
    for candidate in item["inputs"]:
        if os.path.exists(candidate):
            input_path = candidate
            break
            
    if not input_path:
        print(f"Skipping {item['name']}, no input found")
        continue

    print(f"Processing {item['name']} from {input_path}...")
    with open(input_path, "rb") as f:
        input_bytes = f.read()

    output_bytes = rembg.remove(
        input_bytes,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10
    )

    with open(item["output"], "wb") as f:
        f.write(output_bytes)
        
    print(f"Saved {item['output']}")

print("All watches isolated successfully with true alpha transparency!")
