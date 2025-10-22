echo "=== CONTRA O BULLYING - BUILD SCRIPT ==="
echo "Upgrading pip..."
pip install --upgrade pip
echo "Installing setuptools and wheel..."
pip install setuptools wheel
echo "Installing dependencies..."
pip install -r requirements.txt
echo "Installing gunicorn specifically..."
pip install gunicorn==21.2.0
echo "Build completed successfully!"
echo "=== READY TO START ==="