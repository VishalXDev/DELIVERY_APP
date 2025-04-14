const request = require('supertest');
const app = require('../app'); // Your app file
const mongoose = require('mongoose');
const PayoutRequest = require('../models/PayoutRequest');
const Wallet = require('../models/Wallet');

describe("Payout Request API", () => {
  let partnerId = "partnerId123"; // Mock partner ID
  let requestId;

  beforeAll(async () => {
    // Set up test data (mock wallet and partner)
    await Wallet.create({ userId: partnerId, balance: 1000 });
  });

  afterAll(async () => {
    // Clean up test data
    await PayoutRequest.deleteMany({});
    await Wallet.deleteMany({});
    await mongoose.connection.close();
  });

  test("should request a payout successfully", async () => {
    const res = await request(app)
      .post("/api/payout/request")
      .send({ partnerId, amount: 500 });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Payout requested");
    expect(res.body.payoutRequest.amount).toBe(500);

    requestId = res.body.payoutRequest._id; // Store requestId for other tests
  });

  test("should fail if balance is insufficient", async () => {
    const res = await request(app)
      .post("/api/payout/request")
      .send({ partnerId, amount: 2000 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Insufficient balance");
  });

  test("should approve payout successfully", async () => {
    const res = await request(app)
      .patch(`/api/payout/approve/${requestId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Payout approved");
  });

  test("should reject payout successfully", async () => {
    const res = await request(app)
      .patch(`/api/payout/reject/${requestId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Payout rejected");
  });
});
