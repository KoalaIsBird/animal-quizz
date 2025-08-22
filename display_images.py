import json
import requests
data = json.load(open('animals-tetrapodes-list.json', 'r'))

print(data[1])
for i,entry in enumerate(data[1:3]):
    item_link, taxon_name, image_link = entry['item'], entry['taxonname'], entry['image']
    image = requests.get(image_link).content
    print(image)
    with open(f'{i}.jpg', 'w') as file_being_written: 
        file_being_written.write(image.content)
        