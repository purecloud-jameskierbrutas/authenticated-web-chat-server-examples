<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>PureCloud Web Chat Demo</title>
</head>

<body>
    <form id="chatForm">
        <h3>Participant Information- local</h3>

        <table class="webchat-config">
            <tbody>
                <tr>
                    <th>First Name:</th>
                    <td><input type="text" id="first-name" value="John" /></td>
                </tr>
                <tr>
                    <th>Last Name:</th>
                    <td><input type="text" id="last-name" value="Doe" /></td>
                </tr>
                <tr>
                    <th>Agent Email:</th>
                    <td><input type="text" id="agent-email" value="alex.agent@example.com" /></td>
                </tr>
            </tbody>
        </table>
        <button type="button" id="chat-button">Start Chat</button>
    </form>
    <div id="chat-container" style="height:600px"></div>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script
		id="purecloud-webchat-js"
		type="text/javascript"
		src="https://apps.mypurecloud.com/webchat/jsapi-v1.js"
		region="us-east-1"
		org-guid="8e380ad4-8188-474b-a0e1-c761c7b6fcf6"
		deployment-key="04b92daa-19c6-4a7f-91ad-35eb8e59eed0"
	></script>

    <script type="text/javascript">

        $(document).ready(function initializeChat () {
            var chatConfig = {
                // Web chat application URL
                webchatAppUrl: 'https://apps.mypurecloud.com/webchat',

                // Web chat service URL
                webchatServiceUrl: 'https://realtime.mypurecloud.com:443',

                // organization GUID
                orgGuid: '8e380ad4-8188-474b-a0e1-c761c7b6fcf6',//

                // Numeric organization ID
                orgId: 28489, //

                // Organization name. Replace with your org name.
                orgName: 'manila',

                // Requested agent language skill (Agent must have this language skill to receive chat)
                language: 'English - Written',

                // Requested agent skills (Agent must have these skills to receive chat)
                skills: ['Computers', 'Printers'],
                // OR
                //skills: [],

                // Priority
                priority: 0,

                // Queue Name
                queueName : 'Support',//

                // Target agent email (OPTIONAL)
                agentEmail: 'alex.agent@example.com',

                // Whether to show submit button or send message on Enter keypress
                showSubmitButton: true,

                // Log level
                logLevel: 'DEBUG',

                // Locale code
                locale: 'en',

                // Whether to allow reconnects
                reconnectEnabled: true,

                //Allowed reconnect origins
                reconnectOrigins: ['https://example.com', 'https://help.example.com', 'https://shop.example.com'],

                // Logo used within the chat window
                companyLogoSmall: {
                    width: 149,
                    height: 149,
                    url: 'https://dhqbrvplips7x.cloudfront.net/webchat/1.0.23/company-logo-small-9c9fe09b.png'
                },
                // Fallback image used for agent if no agent image is defined in the agent's PureCloud profile
                agentAvatar: {
                    width: 462,
                    height: 462,
                    url: 'https://dhqbrvplips7x.cloudfront.net/webchat/1.0.23/agent-e202505f.png'
                },

                // Text displayed with chat window is displayed
                welcomeMessage: 'Thanks for chatting.',

                // CSS class applied to the chat window
                cssClass: 'webchat-frame',

                // Custom style applied to the chat window
                css: {
                    width: '100%',
                    height: '100%'
                }
            };
            var chatButton = document.getElementById('chat-button');

            // Required if reconnects are enabled
            window.PURECLOUD_WEBCHAT_FRAME_CONFIG = {
                containerEl: 'chat-container'
            };

            ININ.webchat.create(chatConfig)
                .then(function (webchat) {
                    // Optionally use isAutoJoined if reconnects are enabled
                    if (webchat.isAutoJoined()) {
                        // Do something to disable chat button
                    } else {
                        chatButton.onclick = function () {
                            var firstName = document.getElementById('first-name').value;
                            var lastName = document.getElementById('last-name').value;
                            var agentEmail = document.getElementById('agent-email').value;

                            // Use getConfig.setConfigProperty() for any web chat configuration property to dynamically set config values.
                            webchat.getConfig().setData({
                                firstName: firstName,
                                lastName: lastName,
                                addressStreet: '64472 Brown Street',
                                addressCity: 'Lindgrenmouth',
                                addressPostalCode: '50163-2735',
                                addressState: 'FL',
                                phoneNumber: '1-916-892-2045 x293',
                                email: 'willie.duit@myspace.com',
                                phoneType: 'Cell',
                                customerId: 59606
                            });

                            //Use the updateConfig function to update batches of properties by passing in a partially filled chatConfig object
                            webchat.updateConfig({
                                agentEmail: 'debrah.agent@example.com',
                                locale: 'es',
                                welcomeMessage: 'Welcome to Example support',
                            });

                            // Alternatively, call webchat.renderPopup here. Note that reconnects do not apply to popup chat.
                            return webchat.renderFrame({
                                containerEl: 'chat-container'
                            });
                        };
                    }
                })
                .catch(function (err){
                    console.log(err);
                });
        });

    </script>

</body>
</html>