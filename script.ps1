Write-Output "Deploying serverless..."
serverless deploy --param="stage=dev" --verbose