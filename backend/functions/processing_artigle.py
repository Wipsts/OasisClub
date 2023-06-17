import re

def processing_data(stringArtigle):
    pattern = r"<.+?>.*?<\/.+?>|<.+?/>"
    # testString = "<span> Ola mundo </span> <p>Ola mundo</p> <p style={{fontStyle: bold}}>Hey boys</p> <br/> <ads/> <img src=''/>"

    tags = re.findall(pattern, stringArtigle)
    return tags
