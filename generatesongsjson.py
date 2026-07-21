import os
import json

songs_root = "songs"

for folder in os.listdir(songs_root):
    path = os.path.join(songs_root, folder)

    if os.path.isdir(path):
        songs = sorted(
            f for f in os.listdir(path)
            if f.lower().endswith(".mp3")
        )

        with open(os.path.join(path, "songs.json"), "w") as file:
            json.dump(songs, file, indent=4)

        print(f"{folder}: {len(songs)} songs")