$: npm install ngrok -g
$: ngrok config add-authtoken <token>
$: ngrok http 5000


Crie sua conta no ngrok.com
Instale a Twilio CLI
$: npm install -g twilio-cli

Configure o Twilio Dev Phone
twilio.com/docs/labs/dev-phone
$: twilio plugins:install @twilio-labs/plugin-dev-phone
$: twilio dev-phone


Crie sua conta Twilio
twil.io/tdc


Setup Qwiklabs e Google TTS/STT
1. da start no lab do qwiklabs
2. loga no projeto do qwiklabs em uma aba anonima
3. em uma aba com o gmail pessoal, abrir o idx.google
4. syncar com o repositório https://github.com/luisleao/twilio-gemini-stream
5. realizar autenticaçao do GCloud:
    $ gcloud config set account student-XX-XXXXXXX@qwiklabs.net
    $ gcloud config set project qwiklabs-gcp-XX-XXXX
    $ gcloud auth login // copia o link pra janela do qwiklabs, senha do usuário qwiklabs
    $ gcloud auth application-default login // copia o link pra janela do qwiklabs, senha do usuário qwiklabs
    $ gcloud services enable speech.googleapis.com

    $ gcloud services enable texttospeech.googleapis.com

6. ir em aistudio.google.com e criar uma API KEY

