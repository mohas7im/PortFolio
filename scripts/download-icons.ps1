$dest = "public\icons"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$base = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/"

$python     = $base + "python/python-original.svg"
$javascript = $base + "javascript/javascript-original.svg"
$typescript = $base + "typescript/typescript-original.svg"
$php        = $base + "php/php-original.svg"
$html       = $base + "html5/html5-original.svg"
$css        = $base + "css3/css3-original.svg"
$sql        = $base + "postgresql/postgresql-original.svg"
$django     = $base + "django/django-plain-wordmark.svg"
$react      = $base + "react/react-original.svg"
$nextjs     = $base + "nextjs/nextjs-original-wordmark.svg"
$tailwind   = $base + "tailwindcss/tailwindcss-original.svg"
$bootstrap  = $base + "bootstrap/bootstrap-original.svg"
$git        = $base + "git/git-original.svg"
$docker     = $base + "docker/docker-original.svg"
$chartjs    = $base + "chartjs/chartjs-original.svg"

$files = @(
  @{ name = "python.svg";     url = $python },
  @{ name = "javascript.svg"; url = $javascript },
  @{ name = "typescript.svg"; url = $typescript },
  @{ name = "php.svg";        url = $php },
  @{ name = "html.svg";       url = $html },
  @{ name = "css.svg";        url = $css },
  @{ name = "sql.svg";        url = $sql },
  @{ name = "django.svg";     url = $django },
  @{ name = "react.svg";      url = $react },
  @{ name = "nextjs.svg";     url = $nextjs },
  @{ name = "tailwind.svg";   url = $tailwind },
  @{ name = "bootstrap.svg";  url = $bootstrap },
  @{ name = "git.svg";        url = $git },
  @{ name = "docker.svg";     url = $docker },
  @{ name = "chartjs.svg";    url = $chartjs }
)

foreach ($item in $files) {
  $out = Join-Path $dest $item.name
  try {
    Invoke-WebRequest -Uri $item.url -OutFile $out -UseBasicParsing -TimeoutSec 20
    Write-Host "OK  $($item.name)"
  } catch {
    Write-Host "ERR $($item.name) - $($_.Exception.Message)"
  }
}

Write-Host "Done"
