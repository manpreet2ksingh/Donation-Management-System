const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

exports.send = (req,res) =>{

        const ngoEmail = req.body.ngoEmail
        const userEmail = req.body.userEmail
        const volunteerEmail = "kunalmamgain15@gmail.com"

        console.log(req.body.selectedNgo)
        console.log(ngoEmail)
        console.log(userEmail)
        console.log(volunteerEmail)

        const emailData1 = {
            to: ngoEmail, // ngo
            from: 'msingh_be18@thapar.edu',
            subject: `New donation made by ${req.body.name}`,
            html: `
            <h1>Hey director of ${req.body.selectedNgo}, Somebody just made a donation to your NGO</h1>
            <h1>Donation Details - </h1>
            <h2>${req.body.donationDetails}</h2>
            <h2>Volunteer by the name Kunal is assigned the job of pickup.</h2>
            <h1>Donor details - </h1>
            <h2>Name : ${req.body.name}</h2>
            <h2>Contact : ${req.body.contact}</h2>
            <h1>Pickup Address : ${req.body.pickUpAddress} </h1>
            <h2>State : ${req.body.state}</h2>
            <h2>City : ${req.body.city}</h2>`
        };
        sgMail
            .send(emailData1)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));
 
        
        const emailData2 = {
            to: userEmail,
            from: 'msingh_be18@thapar.edu',
            subject: `Donation made successfully`,
            html: `
            <h1>Hey ${req.body.name}, Thank you for your donation.</h1>
            <h2>Volunteer by the name Kunal will come for the pickup.</h2>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));

            const emailData3 = {
                to: volunteerEmail, // volunteer
                from: 'msingh_be18@thapar.edu',
                subject: `Pickup details of new request.`,
                html: `
                <h1>Hey volunteer of ${req.body.selectedNgo}</h1>
                <h2>New request is assigned to you.</h2>
                <h1>Pickup Details - </h1>
                <h2>Pickup Address : ${req.body.pickUpAddress} </h2>
                <h2>State : ${req.body.state}</h2>
                <h2>City : ${req.body.city}</h2>
                <h1>Donation Details : </h1>
                <h2>${req.body.donationDetails}</h2>
                <h1>Donor details : </h1>
                <h2>Name : ${req.body.name}</h2>
                <h2>Contact : ${req.body.contact}</h2>
                `
            };
            sgMail
                .send(emailData3)
                .then(sent => console.log('SENT >>>', sent))
                .catch(err => console.log('ERR >>>', err));
            
            res.json({
                Success:"Mail sent successfully"
            })
};
