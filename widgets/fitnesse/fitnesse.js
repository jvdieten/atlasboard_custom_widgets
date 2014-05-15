widget = {
	onData: function (el, data) {

        function createTestEntry(testPage) {
            return '<tr><td>' + testPage.testName + '</td><td class="passed">' + testPage.testsPassed + '</td><td class="failed">' + testPage.testsFailed + '</td></tr>';
        };

        try{
            $('.test_results', el).empty();
            $('.test_results', el).append('<th></th><th>Passed</th><th>Failed</th>');

            data.forEach(function (page) {
                $('.projectName', el).html(page.projectName);
                $('.test_results', el).append(createTestEntry(page));
            });

            data.empty();
        }catch(error){
            //ignore
        }

    },
    onError: function (el, data) {
        var $error = $('<div class="container"><img src="images/warning.png"></div>');
        $error.append($('<div class="error_message content"></span>').text(data.error));
        $('.error', el).empty().append($error);
    }
};
