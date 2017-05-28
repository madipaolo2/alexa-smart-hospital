# Alexa Smart Hospital Skill

**Inspiration**

I work in the kitchen at a 300-bed medical center. Interacting with patients every day, I've realized that most people have similar concerns and questions while suffering through the massive inconvenience of a hospital admission. I've also seen nurses and other staff members overworked and stressed as they try to tend to every need each patient has. Anything that can reduce the load these men and women need to carry is a necessary investment.

**What it does**

This Alexa Skill is designed to assist patients in every way possible. Currently, it can tell patients how to identify and contact hospital personnel, it can help patients understand how to use the features in their rooms (call bell, bed, TV, etc.), it has a small dictionary to define certain words unique to hospitals, and it can help visitors navigate the hospital, finding the cafeteria, gift shop, and parking locations.

**How I built it**

The skill is built using javascript. I also made use of Google Sheets to store information that Alexa uses to answer requests. For example, if a user asks for the phone extension for the pharmacist, my skill combs over a spreadsheet for the 'pharmacist' value and returns the number in the corresponding cell.

I also enlisted the help of two friends who work in the medical profession. They helped brainstorm all the questions patients end up asking and helped populate lists of personnel titles and department names. Thank you so much Aurielle and Anjoli Rowe.

**Challenges I ran into**

Scope. My imagination is stronger than my ability; I have tons of ideas for features not yet implemented. Limiting myself and submitting a skill I see as only 25% complete was necessary.

I also don't have any formal education in computer science or programming, so thinking of "work-arounds" was somewhat common in my development process when I wasn't sure how to do something I wanted to.

**Accomplishments that I'm proud of**

Finishing a working Alexa skill. Again, with no formal computer science experience, the fact that I was able to build anything that functions as intended is a major accomplishment to me. I'm looking forward to building on what I already have and even getting feedback from other developers on how to either clean up the code I have or expand it in ways I haven't realized I could.

**What I learned**

I learned that the hardest part was the last 10%. I built the majority of this skill early on in he competition, but it took a lot of effort for me to finalize and clean everything up. I also had to learn to let go of some ideas that I just don't currently have the capability of doing.

**What's next for My Hospital (Smart Hospital Alexa Skill)**

I want to continue adding features. As one example, I want to add a diet and nutrition feature that can inform patients about the specifics of whatever diet their doctor has assigned to them. I would also like to then extend that feature to allow meal ordering from the Alexa device itself.

I also want to note that this skill would not work for every patient. Many in hospitals have trouble speaking or would otherwise have trouble using this technology. However, even in those instances, I would like to have features that would benefit visitors, nurses, and other hospital staff. I see Alexa moving from patient rooms to hallways and lobbies, assisting people everywhere in the hospital.

## Scalability & Versatility

**Google Sheets Make Updating Easy**
In order to use this Alexa Skill in a hospital or medical center, some changes would need to be made. For ease of use, information about the hospital is pulled from a series of Google Spreadhseet as shown below:

![Hospital Information Database](https://github.com/madipaolo2/alexa-smart-hospital/blob/master/HospInfoData.PNG?raw=true "Hospital Information Database")

A developer would only need to set up a copy of the Google Spreadsheets and edit the endpoints for each Intent in the Alexa Skill. Then, anyone with knowledge of Google Speadsheets could edit the data.

**Installation is cheaper than you might think**
While it seems a fantasy for medical centers that already struggle with managing expenses to implement something as seemingly advanced as this, cost of implementation would actually be very small. Amazon has released the Echo Dot device which sells for ~$50. It contains the Alexa software, a microphone, and speaker. It's the only device needed to start using this skill, making the total cost of implementation $50 per patient room.

**Quick and Easy Customization**
The nature of Alexa's Skills make this device extremely easy to upgrade. Any idea or need could be built using the existing Smart Hospital Skill framework, and it would automatically update every device in the hospital with 0 downtime.
