# Team Hassos Hustlers yo

gunicorn --chdir back -w 2 -b 0.0.0.0:4254 server:app

backend install

cd back
python3 -m venv .venv
source ./.venv/bin/activate
pip install -r requirements.txt
sudo apt install librsvg2-bin
FLASK_APP=server flask run

funktioniert bei 2. building 1. floor, sonst nich

ground level löschen, dann 3d model anschauen