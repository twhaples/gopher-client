# gopher-client

1993 called and they want their [protocol](https://en.wikipedia.org/wiki/Gopher_(protocol)) back.

## About
This is a node.js client for the Gopher protocol.
This software is unreleased and incomplete, and very poorly tested against reality.

### Gopher Resources
* [RFC 1436](http://www.rfc-base.org/rfc-1436.html)
* [The Overbite Project](http://gopher.floodgap.com/overbite/)
  * also available at [gopher://gopher.floodgap.com/1/world](gopher://gopher.floodgap.com/1/world)
* [gopher-node](https://www.npmjs.com/package/gopher-node) (ultra-bare-bones node.js Gopher *server*)

### FAQ
#### Isn't gopher... dead?
[No, it's just resting.](https://www.youtube.com/watch?v=npjOSLCR2hE)

#### why??
As a programmer I have spent a fair amount of time dealing with REST.
So I thought it would be interesting to take a step back to a simpler time,
and look at older forms of information organization and retrieval.
There is an attractive simplicity to the Gopher model of organizing
information. The protocol is simple enough to make writing a good client
achievable, but has enough parsing to make it interesting, and it seems
no one has written a good Gopher library in Node.js yet.

Also, I may have possibly been reading coverage of the recent
["STUPID SHIT NO ONE NEEDS & TERRIBLE IDEAS HACKATHON"](http://www.stupidhackathon.com/).

#### Can we hire you to write code?
I have just moved to London and I am looking for a full-time position:
see [my LinkedIn profile](http://linkedin.com/in/whaples) for the latest.
Also please note that Node.js is not my primary programming language and
I cannot provide extensive ecosystem advice and architectural direction
at this time.

#### Can you hire you to build Gopher applications?
I'd prefer to work on something more relevant.

## TODO
Major functionality:
* Support search queries
* Support following a link
* Support decoding files (e.g. binhex, uuencode)

Related work:
* Validation of general approach by writing a simple console-based Gopher client.
(This client will not be part of the library proper.)
* A Gopher-HTTP gateway that doesn't look like it came out of the 1990s.

Internal design considerations:
* Revisit Type strategy

Quality:
* Test against real-world Gopher servers
* Detailed unit tests around Request objects
* Hardening against malicious Gopher servers (*snerk*)

Todon't:
* Support Gopher+
