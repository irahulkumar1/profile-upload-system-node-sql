exports.index = function (req, res) {
    message = '';
    if (req.method == "POST") {
        // var post = req.body;
        // var email = post.email;
        // var bank_account = post.bank_account;
        // var upi_id = post.upi_id;
        console.log(req.body)
        // var fname = post.first_name;

        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        var file = req.files.uploaded_image;
        var verify_kyc_image = file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('public/images/upload_images/' + file.name, function (err) {

                if (err)

                    return res.status(500).send(err);

                const formData = {
                    email: req.body.email,
                    bank_account: req.body.bank_account,
                    upi_id: req.body.upi_id,
                    verify_kyc_image: file.name
                };


                var sql = "INSERT INTO `users_image` Set ? ";


                // previous code
                // var sql = "INSERT INTO `users_image`(`bank_account`,`upi_id`,`email`,`verify_kyc_image`) VALUES ('" + bank_account + "','" + upi_id + "','" + email + "','" + verify_kyc_image + "')";

                var query = db.query(sql, formData, function (err, result) {
                    console.log(err, result)
                    res.render('index');
                });
            });
        } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs', { message: message });
        }
    } else {
        res.render('index');
    }

};

exports.profile = function (req, res) {
    var message = '';
    var id = req.params.id;
    var sql = "SELECT * FROM `users_image` WHERE `id`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Profile not found!";

        res.render('profile.ejs', { data: result, message: message });
    });
};