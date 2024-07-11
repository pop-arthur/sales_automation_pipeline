{
  "version": "2.0",
  "vulnerabilities": [
    {{- range .Results}}
    {{- range .Vulnerabilities}}
    {
      "id": "{{.VulnerabilityID}}",
      "category": "container_scanning",
      "name": "{{.PkgName}}",
      "message": "{{.Description}}",
      "description": "{{.Description}}",
      "severity": "{{.Severity}}",
      "solution": "{{.FixedVersion}}",
      "scanner": {
        "id": "trivy",
        "name": "Trivy"
      },
      "location": {
        "file": "{{.PkgName}}",
        "dependency": {
          "package": "{{.PkgName}}",
          "version": "{{.InstalledVersion}}"
        }
      },
      "identifiers": [
        {
          "type": "CVE",
          "name": "{{.VulnerabilityID}}",
          "value": "{{.VulnerabilityID}}",
          "url": "{{.PrimaryURL}}"
        }
      ],
      "links": [
        {
          "url": "{{.PrimaryURL}}"
        }
      ]
    }{{if not (last .Vulnerabilities)}},{{end}}
    {{- end}}
    {{- end}}
  ]
}
