Set-DefaultAWSRegion -Region us-west-2

$stackName = "Game"
$template = Get-Content -Path ./game-template.json -Raw
$new = $true

try {
    Get-CFNStack -StackName $stackName | Out-Null
    Write-Host "Stack found."
    $new = $false
}
catch {
    Write-Host "No stack found."
}

if ($new) {    
    Write-Host "Creating stack $stackName..."
    New-CFNStack -StackName Game -TemplateBody $template -Capability CAPABILITY_NAMED_IAM
    Write-Host "Stack created!"
}
else {
    Write-Host "Updating stack $stackName..."
    Update-CFNStack -StackName Game -TemplateBody $template -Capability CAPABILITY_NAMED_IAM
    Write-Host "Stack updated!"
}