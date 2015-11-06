//mocha.bail();
//mocha.run();

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;

// Get User Media timeout
var gUMTimeout = 2000;

// Test item timeout
var testItemTimeout = 2000;

// Init timeout
var initTimeout = 10000;

describe('getUserMedia | MediaStreamConstraints', function() {

	/* Attributes */
	var stream = null;
	var track = null;

	/* Get User Media */
	before(function (done) {
		this.timeout(initTimeout);

    AdapterJS.webRTCReady(function() {
    	done();
    });
	});


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				expect(stream.getAudioTracks().length).to.equal(1);
				expect(stream.getVideoTracks().length).to.equal(0);
				done();

			}, function (error) {
				throw error;
			});
		});

	})({ audio: true,	video: false });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				expect(stream.getAudioTracks().length).to.equal(1);
				expect(stream.getVideoTracks().length).to.equal(0);
				done();

			}, function (error) {
				throw error;
			});
		});

	})({ audio: true });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				expect(stream.getAudioTracks().length).to.equal(0);
				expect(stream.getVideoTracks().length).to.equal(1);
				done();

			}, function (error) {
				throw error;
			});
		});
	})({ audio: false, video: true });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				expect(stream.getAudioTracks().length).to.equal(0);
				expect(stream.getVideoTracks().length).to.equal(1);
				done();

			}, function (error) {
				throw error;
			});
		});
	})({ video: true });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				expect(stream.getAudioTracks().length).to.equal(1);
				expect(stream.getVideoTracks().length).to.equal(1);
				done();

			}, function (error) {
				throw error;
			});
		});
	})({ audio: true, video: true });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				expect(stream.getAudioTracks().length).to.equal(0);
				expect(stream.getVideoTracks().length).to.equal(0);
				done();

			}, function (error) {
				throw error;
			});
		});
	})({ audio: false, video: false });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			var video = document.createElement('video');
			video.autoplay = 'autoplay';

			video.onplaying = function () {
				expect(video.videoWidth).to.be.at.least(1240);
				expect(video.videoHeight).to.be.at.least(720);
				done();
			};

			document.body.appendChild(video);

			window.getUserMedia(constraints, function (stream) {
				video = attachMediaStream(video, stream);
			}, function (error) {
				throw error;
			});
		});
	})({ video: { mandatory: { minWidth: 1240, minHeight: 720 } } });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			var video = document.createElement('video');
			video.autoplay = 'autoplay';

			video.onplaying = function () {
				expect(video.videoWidth).to.be.at.most(600);
				expect(video.videoHeight).to.be.at.most(300);
				done();
			};

			document.body.appendChild(video);

			window.getUserMedia(constraints, function (stream) {
				video = attachMediaStream(video, stream);
			}, function (error) {
				throw error;
			});
		});
	})({ video: { mandatory: { maxWidth: 600, maxHeight: 300 } } });


	(function (constraints) {
		it.skip('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				//TODO(J-O): check framerate
				// Follow these bugs:
				// https://code.google.com/p/webrtc/issues/detail?id=4807
				// https://code.google.com/p/webrtc/issues/detail?id=2481

				// var settings = stream.getVideoTracks()[0].getSettings();
				// expect(setting.).to.be.at.most(600);
			}, function (error) {
				throw error;
			});
		});
	})({ video: { mandatory: { minFrameRate: 15 } } });


	(function (constraints) {
		it.skip('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				//TODO(J-O): check framerate
				// Follow these bugs:
				// https://code.google.com/p/webrtc/issues/detail?id=4807
				// https://code.google.com/p/webrtc/issues/detail?id=2481

				// var settings = stream.getVideoTracks()[0].getSettings();
				// expect(setting.).to.be.at.most(600);
			}, function (error) {
				throw error;
			});
		});
	})({ video: { mandatory: { maxFrameRate: 50 } } });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			var video = document.createElement('video');
			video.autoplay = 'autoplay';

			video.onplaying = function () {
				expect(video.videoWidth / video.videoHeight).to.be.at.least(16 / 10);
				done();
			};

			document.body.appendChild(video);

			window.getUserMedia(constraints, function (stream) {
				video = attachMediaStream(video, stream);
			}, function (error) {
				throw error;
			});
		});
	})({ video: { mandatory: { minAspectRatio: '16:10' } } });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			var video = document.createElement('video');
			video.autoplay = 'autoplay';

			video.onplaying = function () {
				expect(video.videoWidth / video.videoHeight).to.be.at.most(21 / 9);
				done();
			};

			document.body.appendChild(video);

			window.getUserMedia(constraints, function (stream) {
				video = attachMediaStream(video, stream);
			}, function (error) {
				throw error;
			});
		});
	})({ video: { mandatory: { maxAspectRatio: '21:9' } } });


	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			var video = document.createElement('video');
			document.body.appendChild(video);

			window.getUserMedia(constraints, function (stream) {
				assert.typeOf(stream, 'object');
				done();
			}, function (error) {
				throw new Error('Optional constraint should not affect the retrieval of getUserMedia');
			});
		});
	})({ video: { optional: [{ minWidth: 1024, maxWidth: 800 }] } });


	(function (constraints) {
		it.skip('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			var video = document.createElement('video');
			video.autoplay = 'autoplay';

			video.onplaying = function () {
				expect(video.videoWidth).to.be.at.least(358);
				expect(video.videoHeight).to.be.at.least(59);
				done();
			};

			document.body.appendChild(video);

			window.getUserMedia(constraints, function (stream) {
				video = attachMediaStream(video, stream);
			}, function (error) {
				throw error;
			});
		});
	})({ video: { mandatory: { width: { min: 358 }, height: { min: 59 } } } });


	(function (constraints) {
		it.skip('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			var video = document.createElement('video');
			video.autoplay = 'autoplay';

			video.onplaying = function () {
				expect(video.videoWidth).to.be.at.most(1310);
				expect(video.videoHeight).to.be.at.most(120);
				done();
			};

			document.body.appendChild(video);

			window.getUserMedia(constraints, function (stream) {
				video = attachMediaStream(video, stream);
			}, function (error) {
				throw error;
			});
		});
	})({ video: { mandatory: { width: { max: 1310 }, height: { max: 120 } } } });


	// screensharing tests
	// NOTE: This tests has many more scenarios and use-cases, hence it isn't one way tests
	// Is the tests detailed enough?
	// NOTE: Messy
	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				// firefox does only support mediaSource 'window' or 'screen'
				// plugin and chrome ignores that
				// opera does not support at least of what we know
				expect(['chrome', 'safari', 'IE']).to.include(window.webrtcDetectedBrowser);
				// safari flags should be true
				if (window.webrtcDetectedBrowser === 'IE' || window.webrtcDetectedBrowser === 'safari') {
					expect([AdapterJS.WebRTCPlugin.plugin.HasScreensharingFeature,
						AdapterJS.WebRTCPlugin.plugin.isScreensharingAvailable]).to.equal([true, true]);
				}
				expect(typeof stream).to.equal('object');
				assert.typeOf(stream.getAudioTracks, 'function');
				assert.typeOf(stream.getVideoTracks, 'function');
				expect(stream.getVideoTracks()).to.have.length(1);
				done();
			}, function (error) {
				// plugin not supported
				if (window.webrtcDetectedBrowser === 'safari' || window.webrtcDetectedBrowser === 'firefox') {
					expect(!!AdapterJS.WebRTCPlugin.plugin.HasScreensharingFeature &&
						AdapterJS.WebRTCPlugin.plugin.isScreensharingAvailable).to.equal(false);
				// firefox should only throw this error if not its a failure
				} else if (window.webrtcDetectedBrowser === 'firefox') {
					expect([error.message, window.webrtcDetectedBrowser]).to.equal(
						['Only "screen" and "window" option is available as mediaSource', 'firefox']);
				// opps
				} else {
					throw error;
				}
				done();
			});
		});
	})({ video: { mediaSource: 'test' } });

	(function (constraints) {
		it('getUserMedia(MediaStreamConstraints = ' + printJSON(constraints) + ')', function (done) {
			this.timeout(testItemTimeout + gUMTimeout);

			window.getUserMedia(constraints, function (stream) {
				// firefox does only support mediaSource 'window' or 'screen'
				// plugin and chrome ignores that
				// opera does not support at least of what we know
				expect(['chrome', 'safari', 'IE', 'firefox']).to.include(window.webrtcDetectedBrowser);
				// safari flags should be true
				if (window.webrtcDetectedBrowser === 'IE' || window.webrtcDetectedBrowser === 'safari') {
					expect([AdapterJS.WebRTCPlugin.plugin.HasScreensharingFeature,
						AdapterJS.WebRTCPlugin.plugin.isScreensharingAvailable]).to.equal([true, true]);
				}
				expect(typeof stream).to.equal('object');
				assert.typeOf(stream.getAudioTracks, 'function');
				assert.typeOf(stream.getVideoTracks, 'function');
				expect(stream.getVideoTracks()).to.have.length(1);
				if (window.webrtcDetectedBrowser === 'firefox') {
					expect(stream.getAudioTracks()).to.have.length(1);
				}
				done();
			}, function (error) {
				// plugin not supported
				if (window.webrtcDetectedBrowser === 'safari' || window.webrtcDetectedBrowser === 'firefox') {
					expect(!!AdapterJS.WebRTCPlugin.plugin.HasScreensharingFeature &&
						AdapterJS.WebRTCPlugin.plugin.isScreensharingAvailable).to.equal(false);
				// opps
				} else {
					throw error;
				}
			});
		});
	})({ video: { mediaSource: 'window' }, audio: true });

});