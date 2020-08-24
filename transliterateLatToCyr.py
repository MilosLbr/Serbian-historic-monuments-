from transliterate import translit, detect_language

def transliterateLatToCyr(text):
    # if text is already cyrillic return original text else return transliterated latin to cyrilic script

    scriptLanguage = detect_language(text)
    
    if(scriptLanguage in ['ru', 'sr', 'uk']):
        return text
    else:
        transliteratedText = translit(text, 'sr')
        
        return transliteratedText
