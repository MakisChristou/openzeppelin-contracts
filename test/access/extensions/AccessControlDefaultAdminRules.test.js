const { time, constants } = require('@openzeppelin/test-helpers');
const {
  shouldBehaveLikeAccessControl,
  shouldBehaveLikeAccessControlDefaultAdminRules,
} = require('../AccessControl.behavior.js');
const { expectThorRevert, expectRevertCheckStrategy } = require('../../helpers/errors.js');

const AccessControlDefaultAdminRules = artifacts.require('$AccessControlDefaultAdminRules');

contract('AccessControlDefaultAdminRules', function (accounts) {
  const delay = web3.utils.toBN(time.duration.hours(10));

  beforeEach(async function () {
    this.accessControl = await AccessControlDefaultAdminRules.new(delay, accounts[0], { from: accounts[0] });
  });

  it('initial admin not zero', async function () {
    await expectThorRevert(
      AccessControlDefaultAdminRules.new(delay, constants.ZERO_ADDRESS),
      '',
      expectRevertCheckStrategy.unspecified,
    );
  });

  shouldBehaveLikeAccessControl(...accounts);
  shouldBehaveLikeAccessControlDefaultAdminRules(delay, ...accounts);
});
