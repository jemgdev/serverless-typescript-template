# script.ps1
Write-Output "Ejecutando un script de PowerShell desde npm"
serverless deploy --param="stage=dev"
# Agrega más comandos aquí