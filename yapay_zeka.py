import os
import sys
from google import genai
from google.genai import types

def yazilim_asistani():
    # Telefon ekranında rahat okunması için terminali temizler
    os.system('clear')
    
    print("="*50)
    print("🚀 YAZILIM YAPAY ZEKA ASİSTANI BAŞLATILDI 🚀")
    print("= Chatbotunuza yazılımla ilgili her şeyi sorabilirsiniz.")
    print("= Çıkmak için 'cikis' yazın.")
    print("="*50)

    # API anahtarını kontrol eder
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("\n❌ HATA: GEMINI_API_KEY bulunamadı!")
        print("Lütfen terminale komutu doğru yazdığınızdan emin olun.\n")
        return

    # En güncel Gemini istemcisini ve kodlama yeteneği yüksek modeli başlatır
    client = genai.Client()
    model_id = "gemini-2.5-flash"

    # Yapay zekaya yazılım uzmanı rolü veriyoruz
    sistem_talimati = (
        "Sen uzman bir yazılım mühendisi asistanısın. Görevin kullanıcının "
        "kodlama, hata ayıklama (debugging), algoritma ve yazılım mimarisi "
        "sorularını yanıtlamaktır. Kod örneklerini temiz, optimize ve anlaşılır "
        "açıklamalarla birlikte Türkçe olarak sunmalısın."
    )

    # Sohbet geçmişini başlatan yapı
    chat = client.chats.create(
        model=model_id,
        config=types.GenerateContentConfig(
            system_instruction=sistem_talimati,
            temperature=0.3, # Kod üretiminde daha tutarlı olması için
        )
    )

    while True:
        try:
            soru = input("\n👨‍💻 Siz: ")
            if soru.lower() in ['cikis', 'çıkış', 'quit', 'exit']:
                print("\nYapay zeka kapatılıyor. İyi kodlamalar! 👋")
                break
                
            if not soru.strip():
                continue

            print("\n🤖 Yapay Zeka Düşünüyor...")
            response = chat.send_message(soru)
            
            print("\n" + "="*40 + " CEVAP " + "="*40)
            print(response.text)
            print("="*87)

        except Exception as e:
            print(f"\n Bir hata oluştu: {e}")

if __name__ == "__main__":
    yazilim_asistani()
  
