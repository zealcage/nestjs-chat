
 Chat App
 
- Authentication
	For authentication part, I made a basic authentication that user should connect with username and correct token (token set to “xxx” in message.gateway.ts file.). Normally I would use at least JWT token and it should be inside header of the connection not in parameters part for authentication but since its not specified and it is easier to test in this way I kept it like that.

- Sending message
	As I understand from the challenge description file you sent me, all users are in a group with their friends. So, I put them in a room with their self userId and friendsIds. I used the same rooms for sending message and for “online” or “offline” event. 

N server implementation
	I have added SocketAdapter with redis for this purpose. So, as long as the web socket connected to the same redis, server count can be increased directly. Also I would add mongoDB and Redis cluster in end product for better performance since the app has a lots o users.

Testing the challenge 
	For testing, I have added some parts for you. 
	- First 11th line can be uncommented inside the user.service.ts for adding 4 users. (user1 has 3 friends, user2 and user4 have 2 friends, user3 has 1 friend.) 
	- After running the command docker-compose-up, port 3000 will be exposed. Example connection through socket.io is “http://localhost:3000?userName=user3&token=xxx".
	- There are 3 listeners in client part, 
		- “newChat” which user gets new messages.
		- “unseenChat” which user gets last 100 messages when first connects.
		- “userStatus” which user gets “online” or “offline” events about its friends.
	- 1 listener in server part,
		- “chat” where users send their messages to. 
	- Also in docket-compose.yml file I have added a second backend for testing that you can uncomment and try. The port is 3001 there. "http://localhost:3001?userName=user3&token=xxx" 


Thank you for reading 😊

