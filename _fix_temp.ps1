$file = 'd:\Chi_oi-main\frontend\admin\quanlytasker.html'
$lines = [System.IO.File]::ReadAllLines($file, [System.Text.Encoding]::UTF8)

# Bug #21: Remove static mockup rows (lines 281 to 483 = index 280 to 482)
# Find the line with "Row 2: Pending" or the first static <tr> after the loading placeholder
$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '<tr class="hover:bg-background' -and $startIdx -eq -1 -and $i -gt 275 -and $i -lt 290) {
        $startIdx = $i
    }
    if ($lines[$i] -match '</tbody>' -and $startIdx -gt 0 -and $i -gt $startIdx) {
        $endIdx = $i - 1
        break
    }
}

if ($startIdx -gt 0 -and $endIdx -gt $startIdx) {
    $newLines = New-Object System.Collections.Generic.List[string]
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($i -ge $startIdx -and $i -le $endIdx) {
            continue  # Skip static rows
        }
        $newLines.Add($lines[$i])
    }
    [System.IO.File]::WriteAllLines($file, $newLines.ToArray(), [System.Text.Encoding]::UTF8)
    Write-Host "Bug #21: Removed $($endIdx - $startIdx + 1) static mockup lines (from index $startIdx to $endIdx)"
} else {
    Write-Host "Could not find static rows to remove (startIdx=$startIdx, endIdx=$endIdx)"
}
