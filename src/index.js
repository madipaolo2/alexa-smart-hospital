var https = require ('https')

exports.handler = (event, context) => {
  if (event.session.application.applicationId !== "amzn1.ask.skill.04bd0101-f84f-4a2d-a225-018385aa82b4") {
    context.fail("Invalid Application Id");
  }

  switch(event.request.type) {
    case "LaunchRequest":
      context.succeed(
        buildResponse({},
        buildSpeechletResponseWithoutCard("Hello. My name is Alexa. I'm sorry you have to be here, but I hope I can make things a little bit easier for you. I am directly connected to the hospital and I have answers to most questions you will have. You can ask about how to use things in your room like your call bell, lights, and bed. You can ask about hospital personnel including how to identify them and how to call them on your room's phone. You can ask me about what hospital words and vocabulary I can define, or how to get somewhere in the hospital like the cafeteria or gift shop. Just be sure to start your request by saying, Alexa. Ask my hospital, and then say your request. When you want me to go back to sleep, say I'm done, or, thank you. Is there anything I can help you with now?",
        '',
        false)))
    break;

    case "IntentRequest":
      var intent = event.request.intent
      var intentName = event.request.intent.name

      switch(intentName) {
        case "AboutSkill":
          context.succeed(
          buildResponse({},
          buildSpeechletResponseWithoutCard(`This Amazon Alexa skill was designed by `
          + `Michael Di Pall O with help from the Rowe twins, R E L and ` +
          `Anjo li.`,
          '',
          true))
          )
        break;

        case "Lobby Info":
        break;

        case "GenInfoUniforms":
          var uniformColorSlot = intent.slots.UniformColor.value
          var personnelSlot = intent.slots.Personnel.value

          //check for slots
          if (uniformColorSlot != null) {
            //handle special cases
            if (uniformColorSlot == 'blue' || uniformColorSlot == 'light blue' || uniformColorSlot == 'dark blue') {
              context.succeed(
              buildResponse({},
              buildSpeechletResponseWithoutCard(`There are a few shades of blue in the hospital. Is the color you saw navy blue, sky blue, royal blue, or caribbean blue?`,
              '',
              false))
              )
            } else if (uniformColorSlot == 'green' || uniformColorSlot =='light green') {
              context.succeed(
              buildResponse({},
              buildSpeechletResponseWithoutCard(`There are a few shades of green in the hospital. Is the color you saw dark green, mint green, or olive green?`,
              '',
              false))
              )
            } else if (uniformColorSlot == 'purple' || uniformColorSlot == 'light purple') {
              context.succeed(
              buildResponse({},
              buildSpeechletResponseWithoutCard(`There are a couple shades of purple in the hospital. Is the color you saw dark purple, or lilac?`,
              '',
              false))
              )
            } else if (uniformColorSlot == 'brown' || uniformColorSlot == 'light brown' || uniformColorSlot == 'tan') {
              context.succeed(
              buildResponse({},
              buildSpeechletResponseWithoutCard(`There are a couple shades of brown in the hospital. Is the color you saw dark brown or khaki?`,
              '',
              false))
              )
            } else {
              //execute normal
              var endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1kpy12IA5T6YrSpOYFBN58VPKoZGuemKTXpd5C11z_iU/values/A1:E100?key=AIzaSyBad3S9qOcYpcaLV8eTznNeYJR541h3SNs&majorDimension=ROWS`
              var body = ""
              https.get(endpoint, (response) => {
                response.on('data', (chunk) => { body += chunk })
                response.on('end', () => {
                var parsed = JSON.parse(body)

                //variables for what we're looking for
                var uniformColor = ""
                var personnel = ""

                //search spreadsheet for slot values
                for (var i = 0; i < parsed.values.length; i++) {
                  if (parsed.values[i][3] == uniformColorSlot) {
                    uniformColor = parsed.values[i][3]
                    personnel = parsed.values[i][0]

                    context.succeed(
                    buildResponse({},
                    buildSpeechletResponseWithoutCard(`${uniformColor} is usually associated with a ${personnel}. Can I help with anything else?`,
                    '',
                    false)))
                  }
                }
                if (uniformColor != uniformColorSlot) {
                  context.succeed(
                  buildResponse({},
                  buildSpeechletResponseWithoutCard(`I'm sorry. I am not sure who wears that color. Can I help you with anything else?`,
                  '',
                  false)))
                }
              })})
            }
          } else if (personnelSlot != null) {
            //handle special cases
            if (personnelSlot == 'nurse') {
                context.succeed(
                buildResponse({},
                buildSpeechletResponseWithoutCard(`most nurses wear navy blue. The charge nurse wears white, and nursing assistants wear burgundy. Can I help you with anything else?`,
                '',
                false))
                )
              } else if (personnelSlot == 'anesthesia technician' || personnelSlot == 'anesthesia tech') {
                context.succeed(
                buildResponse({},
                buildSpeechletResponseWithoutCard(`anesthesia technicians wear dark purple, the same as most surgical assistants. Can I help you with anything else?`,
                '',
                false)))
              } else {
                //execute normal
                var endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1kpy12IA5T6YrSpOYFBN58VPKoZGuemKTXpd5C11z_iU/values/A1:E100?key=AIzaSyBad3S9qOcYpcaLV8eTznNeYJR541h3SNs&majorDimension=ROWS`
                var body = ""
                https.get(endpoint, (response) => {
                  response.on('data', (chunk) => { body += chunk })
                  response.on('end', () => {
                  var parsed = JSON.parse(body)

                  //variables for what we're looking for
                  var uniformColor = ""
                  var personnel = ""

                  //search spreadsheet for slot values
                  for (var i = 0; i < parsed.values.length; i++) {
                    if (parsed.values[i][0] == personnelSlot) {
                      uniformColor = parsed.values[i][3]
                      personnel = parsed.values[i][0]

                      var speechAnswer = `${personnel}s usually wear ${uniformColor} uniforms. Can I help you with anything else?`
                      if (uniformColor == undefined) {
                        var speechAnswer = `I'm sorry. I don't know what color ${personnelSlot}s usually wear. Can I help you with anything else?`
                      }

                      context.succeed(
                      buildResponse({},
                      buildSpeechletResponseWithoutCard(speechAnswer,
                      '',
                      false)))
                    }
                  }
                  if (personnel != personnelSlot) {
                    context.succeed(
                    buildResponse({},
                    buildSpeechletResponseWithoutCard(`I'm sorry. I am not sure what position you're asking about. In our hospital we have nurses, nursing assistants, radiologists, doctors, transporters, phlebotomists, therapists, and pharmacists. Which position did you want to identify? `,
                    '',
                    false)))
                  }
                })})
              }
          } else {
            //if no slots are invoked
            context.succeed(
            buildResponse({},
            buildSpeechletResponseWithoutCard(`In our hospital, each position wears a uniform with a specific color so you can easily identify them. Most nurses wear navy blue and nursing assistants wear burgundy. You can ask about any other color you've seen. Other uniforms come in white, hunter green, mint green, olive green, dark purple, lilac, khaki, sky blue, royal blue, and caribbean blue. Which color did you want to hear more about?`,
            '',
            false)))
          }
        break;

        case "GenInfoUniformsTwo":
          var uniformColorSlot = intent.slots.UniformColor.value
          if (uniformColorSlot == 'navy blue') {
            context.succeed(
            buildResponse({},
            buildSpeechletResponseWithoutCard(`navy blue is also worn by licensed practical nurses. Can I help you with anything else?`,
            '',
            false)))
          } else if (uniformColorSlot == 'dark purple') {
            context.succeed(
            buildResponse({},
            buildSpeechletResponseWithoutCard(`dark purple is also worn by anesthesia technicians. Can I help you with anything else?`,
            '',
            false)))
          } else {
            context.succeed(
            buildResponse({},
            buildSpeechletResponseWithoutCard(`I don't think anyone else wears a ${uniformColorSlot} colored uniform. Can I help you with anything else?`,
            '',
            false)))
          }
        break;

        case "GenInfoHow":
          var actionSlot = intent.slots.Action.value
          var locationSlot = intent.slots.Location.value

          if (actionSlot != null) {
            var endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1kpy12IA5T6YrSpOYFBN58VPKoZGuemKTXpd5C11z_iU/values/HowTo!A3:E100?key=AIzaSyBad3S9qOcYpcaLV8eTznNeYJR541h3SNs&majorDimension=ROWS`
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
              var parsed = JSON.parse(body)

              var howTo = ""
              var action = ""
              for (var i=0; i<parsed.values.length; i++) {
                if (parsed.values[i][0] == actionSlot) {
                  howTo = parsed.values[i][1]
                  action = parsed.values[i][0]
                  context.succeed(
                  buildResponse({},
                  buildSpeechletResponseWithoutCard(`${howTo}`,
                  '',
                  false)))
                }
              }

                if (action != actionSlot) {
                  context.succeed(
                  buildResponse({},
                  buildSpeechletResponseWithoutCard(`I'm sorry. I'm not sure what you want to do. I can help with your call bell, bed, lights, TV, and room phone. If you need additional help, press the red button on your personal controller to call your nurse. Can I help you with anything else?`,
                  '',
                  false)))
                }
              })
            })
          } else if (locationSlot != null) {
              var endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1kpy12IA5T6YrSpOYFBN58VPKoZGuemKTXpd5C11z_iU/values/Locations!A3:E100?key=AIzaSyBad3S9qOcYpcaLV8eTznNeYJR541h3SNs&majorDimension=ROWS`
              var body = ""
              https.get(endpoint, (response) => {
                response.on('data', (chunk) => { body += chunk })
                response.on('end', () => {
                var parsed = JSON.parse(body)

                var location = ""
                var directions = ""
                for (var i=0; i<parsed.values.length; i++) {
                  if (parsed.values[i][0] == locationSlot) {
                    location = parsed.values[i][0]
                    directions = parsed.values[i][1]
                    if (directions == "") {
                      context.succeed(
                      buildResponse({},
                      buildSpeechletResponseWithoutCard(`I'm sorry. I don't have directions to that location yet. Can I direct you somewhere else?`,
                      '',
                      false)))
                    } else {
                    context.succeed(
                    buildResponse({},
                    buildSpeechletResponseWithoutCard(`${directions}`,
                    '',
                    false)))
                  }}
                }
                  if (location != locationSlot) {
                    context.succeed(
                    buildResponse({},
                    buildSpeechletResponseWithoutCard(`I'm sorry. I don't know if we have anything like that in our hospital. Can I direct you somewhere else?`,
                    '',
                    false)))
                  }
                })
              })
            } else {
              context.succeed(
              buildResponse({},
              buildSpeechletResponseWithoutCard(`The My Hospital Skill can answer many of the questions you'll have while you're here. You can ask about how to use things in your room like your call bell, lights, and bed. You can ask about hospital personnel including how to identify them and how to call them on your room's phone. You can ask me about what hospital words I can define, or how to get somewhere in the hospital. You can also ask questions about your diet like which foods you are encouraged to eat and which you should avoid. Is there anything I can help you with now?`,
              '',
              false)))
            }
        break;

        case "GenInfoDefine":
          var wordSlot = intent.slots.Word.value

          if (wordSlot != null) {
            var endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1kpy12IA5T6YrSpOYFBN58VPKoZGuemKTXpd5C11z_iU/values/Vocab!A3:E100?key=AIzaSyBad3S9qOcYpcaLV8eTznNeYJR541h3SNs&majorDimension=ROWS`
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
              var parsed = JSON.parse(body)

              var word = ""
              var definition = ""
              for (var i=0; i<parsed.values.length; i++) {
                if (parsed.values[i][0] == wordSlot) {
                  definition = parsed.values[i][1]
                  word = parsed.values[i][0]
                  context.succeed(
                  buildResponse({},
                  buildSpeechletResponseWithoutCard(`${definition}`,
                  '',
                  false)))
                }
              }
                  if (definition == "") {
                  context.succeed(
                  buildResponse({},
                  buildSpeechletResponseWithoutCard(`I'm sorry. I don't have that word in my dictionary yet. My dictionary is small now, but I hope to learn more words soon. Right now, you can ask me to define tracheotomy, gastric tube, central line, dialysis, full code order, do not resuscitate, premium, deductible, co insurance, and copay. Which can I define for you now?`,
                  '',
                  false)))
                }
              })
            })
          } else {
            context.succeed(
            buildResponse({},
            buildSpeechletResponseWithoutCard(`My dictionary is small now, but I hope to learn more words soon. Right now, you can ask me to define words like tracheotomy, gastric tube, central line, dialysis, full code order, do not resuscitate, premium, deductible, co insurance, and copay. Which can I define for you now?`,
            '',
            false)))
          }
        break;

        case "UsePhone":
          var personnelSlot = intent.slots.Personnel.value

          var endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1kpy12IA5T6YrSpOYFBN58VPKoZGuemKTXpd5C11z_iU/values/Personnel!A3:E100?key=AIzaSyBad3S9qOcYpcaLV8eTznNeYJR541h3SNs&majorDimension=ROWS`
          var body = ""
          https.get(endpoint, (response) => {
            response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
            var parsed = JSON.parse(body)

            var extension = ""
            var personnel = ""
            for (var i=0; i<parsed.values.length; i++) {
              if (parsed.values[i][0] == personnelSlot) {
                personnel = parsed.values[i][0]
                extension = parsed.values[i][4]
                if (extension == "0") {
                  context.succeed(
                  buildResponse({},
                  buildSpeechletResponseWithoutCard(`I'm sorry. I'm not sure what extension to dial for that person. Please press the red button on your personal controller to call your nurse. Can I help you with anything else?`,
                  '',
                  false)))
                } else {
                context.succeed(
                buildResponse({},
                buildSpeechletResponseWithoutCard(`The extension to dial for your ${personnelSlot} is, ${extension}. Once more, that is, ${extension}. Can I help you with anything else?`,
                '',
                false)))
              }}
            }

              if (personnel != personnelSlot) {
                context.succeed(
                buildResponse({},
                buildSpeechletResponseWithoutCard(`I'm sorry. I'm not sure who you're trying to call. If you need help, press the red button on your personal controller to call your nurse. Can I help you with anything else?`,
                '',
                false)))
              }

            })
          })
        break;

        case "VisitorHelp":
          var locationSlot = intent.slots.Location.value
          if (locationSlot != null) {
            var endpoint = `https://sheets.googleapis.com/v4/spreadsheets/1kpy12IA5T6YrSpOYFBN58VPKoZGuemKTXpd5C11z_iU/values/Locations!A3:E100?key=AIzaSyBad3S9qOcYpcaLV8eTznNeYJR541h3SNs&majorDimension=ROWS`
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
              var parsed = JSON.parse(body)

              var location = ""
              var directions = ""
              for (var i=0; i<parsed.values.length; i++) {
                if (parsed.values[i][0] == locationSlot) {
                  location = parsed.values[i][0]
                  directions = parsed.values[i][1]
                  if (directions == "") {
                    context.succeed(
                    buildResponse({},
                    buildSpeechletResponseWithoutCard(`I'm sorry. I don't have directions to that location yet. Can I direct you somewhere else?`,
                    '',
                    false)))
                  } else {
                  context.succeed(
                  buildResponse({},
                  buildSpeechletResponseWithoutCard(`${directions}`,
                  '',
                  false)))
                }}
              }
                if (location != locationSlot) {
                  context.succeed(
                  buildResponse({},
                  buildSpeechletResponseWithoutCard(`I'm sorry. I don't know if we have anything like that in our hospital. Can I direct you somewhere else?`,
                  '',
                  false)))
                }
              })
            })
          } else {
          //no slots
          context.succeed(
          buildResponse({},
          buildSpeechletResponseWithoutCard(`Visiting hours are from 8 AM to 8 PM daily. If you want to come before or stay after those hours, please go to the nurses station to ask about a temporary security badge. I can also give you directions to other places in the hospital. Is there anywhere else I can direct you?`,
          '',
          false)))
        }
        break;

        case "EndSkill":
          context.succeed(
          buildResponse({},
          buildSpeechletResponseWithoutCard(`I'll be here when you need me.`,
          '',
          true)))
        break;

        case "AMAZON.YesIntent":
          context.succeed(
          buildResponse({},
          buildSpeechletResponseWithoutCard(`What can I do for you? If you need options, say help.`,
          '',
          false)))
        break;

        case "AMAZON.NoIntent":
          context.succeed(
          buildResponse({},
          buildSpeechletResponseWithoutCard(`I'll be here when you need me.`,
          '',
          true)))
        break;

        case "AMAZON.HelpIntent":
          context.succeed(
          buildResponse({},
          buildSpeechletResponseWithoutCard(`The My Hospital Skill can answer many of the questions you'll have while you're here. You can ask about how to use things in your room like your call bell, lights, and bed. You can ask about hospital personnel including how to identify them and how to call them on your room's phone. You can ask me about what hospital words and vocabulary I can define, or how to get somewhere in the hospital like the cafeteria or the gift shop. Just be sure to start your request by saying, Alexa. Ask my hospital, and then say your request. When you want me to go back to sleep, say I'm done, or, thank you. Is there anything I can help you with now?`,
          '',
          false)))
        break;

        case "AMAZON.StopIntent":
          context.succeed(
          buildResponse({},
          buildSpeechletResponseWithoutCard(`I'll be here when you need me.`,
          '',
          true)))
        break;

        case "AMAZON.CancelIntent":
          context.succeed(
          buildResponse({},
          buildSpeechletResponseWithoutCard(`Canceled.`,
          '',
          true)))
        break;

        default:
          context.fail(`Invalid Intent Name: ${intentRequest.intent.name}`)
      }
    break;

    case "SessionEndedRequest":
    break;

    default:
      context.fail(`Invalid Request Type: ${event.request.type}`)
  }
}


//----------------
//Helper Functions
//----------------

buildResponse = (sessionAttributes, speechletResponse) => {
  return {
  version: "1.0",
  sessionAttributes: sessionAttributes,
  response: speechletResponse
}}

//SpeechletResponse 1
buildSpeechletResponse = (outputText, repromptText, cardType, shouldEndSession) => {
  return {
  outputSpeech: {
    type: "PlainText",
    text: outputText
  },
  card: cardType,
  reprompt: {
    type: "PlainText",
    text: repromptText
  },
  shouldEndSession: shouldEndSession
}}

//SpeechletResponse 2
buildSpeechletResponseWithoutCard = (outputText, repromptText, shouldEndSession) => {
  return {
  outputSpeech: {
    type: "PlainText",
    text: outputText
  },
  reprompt: {
    type: "PlainText",
    text: repromptText
  },
  shouldEndSession: shouldEndSession
} }

//cardType 1
buildCard = (cardTitle, cardText, smallImageURL, largeImageURL) => {
  return {
  type: "Standard",
  title: cardTitle,
  content: cardText,
  image: {
    smallImage: smallImageURL,
    largeImage: largeImageURL
  }
}}

//cardType 2
buildCardSimple = (cardTitle, cardText) => {
  return {
  type: "Simple",
  title: cardTitle,
  text: cardText
}}
