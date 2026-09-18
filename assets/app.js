/* Terravect — UI-Logik für die Live-Demo.
   Voraussetzung: assets/demo.js (Kernel-Bundle) lädt vor und setzt window.TERRAVECT. */
(function () {
  'use strict'

  var form = document.getElementById('demo-form')
  var results = document.getElementById('demo-results')
  var runButton = document.getElementById('demo-run')

  if (!form || !results || !window.TERRAVECT) return

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    runDemo()
  })

  function valueOf(id) {
    return document.getElementById(id).value
  }

  function runDemo() {
    var requirements = {}
    var drought = valueOf('ctrl-drought')
    var heat = valueOf('ctrl-heat')
    var season = valueOf('ctrl-season')
    var water = valueOf('ctrl-water')
    var yieldPrio = valueOf('ctrl-yield')
    if (drought) requirements.droughtTolerance = drought
    if (heat) requirements.heatTolerance = heat
    if (season) requirements.seasonLength = season
    if (water) requirements.waterAvailability = water
    if (yieldPrio) requirements.yieldPriority = yieldPrio

    var genus = valueOf('ctrl-crop')
    runButton.disabled = true
    runButton.textContent = 'Berechne …'

    // Kurze Verzögerung, damit der Button-Zustand gerendert wird.
    setTimeout(function () {
      var matches
      try {
        matches = window.TERRAVECT.run(genus, requirements, 5)
      } catch (error) {
        results.innerHTML = ''
        var failure = document.createElement('p')
        failure.className = 'results-empty'
        failure.textContent = 'Abfrage fehlgeschlagen: ' + (error && error.message ? error.message : error)
        results.appendChild(failure)
        runButton.disabled = false
        runButton.textContent = 'Passende Sorten finden'
        return
      }
      renderResults(matches, genus)
      runButton.disabled = false
      runButton.textContent = 'Passende Sorten finden'
    }, 30)
  }

  function renderResults(matches, genus) {
    results.innerHTML = ''
    if (!matches.length) {
      var empty = document.createElement('p')
      empty.className = 'results-empty'
      empty.textContent = 'Keine Sorten gefunden — bitte Bedingungen anpassen.'
      results.appendChild(empty)
      return
    }
    matches.forEach(function (match, position) {
      var row = document.createElement('div')
      row.className = 'result-row'

      var rank = document.createElement('span')
      rank.className = 'result-rank'
      rank.textContent = String(position + 1)

      var main = document.createElement('div')
      main.className = 'result-main'

      var idLine = document.createElement('span')
      idLine.className = 'result-id'
      idLine.textContent = match.id + ' · ' + genus

      var name = document.createElement('span')
      name.className = 'result-name'
      name.textContent = match.cultivar + ' '
      var species = document.createElement('span')
      species.className = 'species'
      species.textContent = match.species
      name.appendChild(species)

      var meta = document.createElement('span')
      meta.className = 'result-meta'
      meta.textContent = 'Herkunft: ' + (match.origin || 'unbekannt')

      var bar = document.createElement('div')
      bar.className = 'result-bar'
      var fill = document.createElement('span')
      fill.style.width = Math.round(match.score * 100) + '%'
      bar.appendChild(fill)

      main.appendChild(idLine)
      main.appendChild(name)
      main.appendChild(meta)
      main.appendChild(bar)

      var scoreBlock = document.createElement('div')
      scoreBlock.className = 'result-scoreblock'
      var score = document.createElement('span')
      score.className = 'result-score'
      score.textContent = match.score.toFixed(3)
      var scoreLabel = document.createElement('span')
      scoreLabel.className = 'result-scorelabel'
      scoreLabel.textContent = 'Match-Score'
      scoreBlock.appendChild(score)
      scoreBlock.appendChild(scoreLabel)

      row.appendChild(rank)
      row.appendChild(main)
      row.appendChild(scoreBlock)
      results.appendChild(row)
    })
  }
})()
