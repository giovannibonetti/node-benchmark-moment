var moment = require('moment');
var _ = require('lodash');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// Exemplo: preenchendo de 8:00 às 18:00 com slots de 30 minutos
suite.add('Adding numbers', function() {
  // Conversão de string "8:30" para número (8 * 60 + 30) e vice-versa
  function timeStringToNumber(timeString) {
    return moment.duration(timeString).asMinutes()
  }
  function timeNumberToString(timeNumber) {
    return moment.utc(timeNumber * 60 * 1000).format("HH:mm")
  }

  const startTime = timeStringToNumber('8:00')
  const endTime = timeStringToNumber('18:00')
  const duration = 30

  const result = _.range(startTime, endTime, duration).map(timeNumberToString)
  // console.log(result)
})
.add('Adding moment duration', function() {
  const currentStartTime = moment.duration('8:00')
  const endTimeAsMin = moment.duration('18:00').asMinutes()
  const gridSlots = []
  while (currentStartTime.asMinutes() < endTimeAsMin) {
    gridSlots.push(moment.utc(currentStartTime.asMilliseconds()).format('HH:mm'))
    currentStartTime.add(30, 'minutes')
  }
  const result = gridSlots
  // console.log(result)
})
.add('Combining both ideas', function() {
  let currentStartTimeAsMin = moment.duration('8:00').asMinutes()
  const endTimeAsMin = moment.duration('18:00').asMinutes()
  const duration = 30
  const gridSlots = []
  while (currentStartTimeAsMin < endTimeAsMin) {
    gridSlots.push(moment.utc(currentStartTimeAsMin * 60 * 1000).format('HH:mm'))
    currentStartTimeAsMin = currentStartTimeAsMin + duration
  }
  const result = gridSlots
  // console.log(result)
})
.add('Combining both ideas (optimized)', function() {
  const locale = 'en'

  function makeTimeString(time) {
    let ampm = null
    hours = Math.floor(time / 60)
    minutes = time % 60

    // am/pm
    if (locale === 'en') {
      ampm = hours >= 12 ? 'pm' : 'am'
      hours = (hours % 12) || 12
    }

    hh = hours < 10 ? `0${hours}` : `${hours}`
    mm = minutes < 10 ? `0${minutes}` : `${minutes}`
    return ampm ? `${hh}:${mm} ${ampm}` : `${hh}:${mm}`
  }
  const startTimeAsMin = moment.duration('8:00').asMinutes()
  const endTimeAsMin = moment.duration('18:00').asMinutes()
  const duration = 30
  const gridSlots =
    _.range(startTimeAsMin, endTimeAsMin, duration)
    .map(makeTimeString)

  // console.log(gridSlots)
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });

