describe("addItemForm", () => {
  it("base example, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto("http://localhost:6006/?path=/story/todolists-additemform--add-item-form-stories", {
      waitUntil: "networkidle2",
    })

    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})
