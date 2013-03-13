var jade = require('jade');
var sysPath = require('path');

describe('Plugin', function() {
  var plugin;

  beforeEach(function() {
    plugin = new Plugin({});
  });

  it('should be an object', function() {
    expect(plugin).to.be.ok;
  });

  it('should has #compile method', function() {
    expect(plugin.compile).to.be.an.instanceof(Function);
  });

  it('should compile and produce valid result', function(done) {
    var content = '!!! 5';
    var expected = '<!DOCTYPE html>';

    plugin.compile(content, 'template.jade', function(error, data) {
      if(error) done(error);
      else {
        expect(eval(data)()).to.equal(expected);
        done();
      }
    });
  });


  describe('getDependencies', function() {
    it('should output valid deps', function(done) {
      var content = "\
include valid1\n\
include valid1.jade\n\
include ../../test/valid1\n\
include ../../test/valid1.jade\n\
extends valid2\n\
extends valid2.jade\n\
include ../../test/valid2\n\
include ../../test/valid2.jade\n\
";

      var expected = [
        sysPath.join('valid1.jade'),
        sysPath.join('valid1.jade'),
        sysPath.join('..', '..', 'test', 'valid1.jade'),
        sysPath.join('..', '..', 'test', 'valid1.jade'),
        sysPath.join('valid2.jade'),
        sysPath.join('valid2.jade'),
        sysPath.join('..', '..', 'test', 'valid2.jade'),
        sysPath.join('..', '..', 'test', 'valid2.jade')
      ];

      plugin.getDependencies(content, 'template.jade', function(error, dependencies) {
        expect(error).not.to.be.ok;
        expect(dependencies).to.eql(expected);
        done();
      });
    });
  });

  describe("the configuration of the jade compiler", function(){
    var jade = require('jade');

    describe('must be backward compatible', function(){
      it('must manage the options inside config.plugins.jade.options', function(){
        var config = {
              plugins: {
                jade: {
                  options: { pretty: true }
                }
              }
            }
          , plugin = new Plugin(config);
        expect(plugin.options.pretty).to.be.equal(
          config.plugins.jade.options.pretty);
      });

      it('must manage the options inside config.plugins.jade too, as backward', function(){
        var config = {
              plugins: {
                jade: {
                  pretty: true
                }
              }
            }
          , plugin = new Plugin(config);
        expect(plugin.options.pretty).to.be.equal(config.plugins.jade.pretty);
      });
    });
    describe("all the compilation options must work", function() {
      it('should support .compile()', function(done){
        var content = 'p foo\n.test\np bar'
          , config = {}
          , plugin = new Plugin(config);

        plugin.compile(content, 'template.jade', function(error, data) {
          if(error) done(error);
          var fn = jade.compile(content);
          expect(eval(data)()).to.equal(fn());
          done();
        });
      });
    });
  });
});
