import {expect, Locator} from "@playwright/test";

export class Task {
    readonly outerContainer:Locator;
    readonly taskLocator: Locator;
    readonly removeButton: Locator;

    constructor(outerContainer: Locator) {
        this.outerContainer = outerContainer;
        this.taskLocator = outerContainer.getByTestId("todo-item");
        this.removeButton = outerContainer.getByTestId("todo-item-button");
    }
    async removeTask(innerText: string): Promise<void> {
       // await this.taskLocator.getByText(innerText).first().hover();
       // const allButtons = await this.removeButton.all();
       // for (const button of allButtons) {
       //     if (await button.isVisible()) await button.click();
        await this.outerContainer.locator("li", {hasText:innerText}).hover();
        await this.outerContainer.locator("li",{hasText:innerText}).locator("button").click();
        }

    async completeTask(innerText: string): Promise<void> {
      await this.outerContainer.locator("li", {hasText: innerText}).locator("input").check();

    }
    async checkTaskCompleted(innerText: string): Promise <void> {
        const locator = this.outerContainer.locator("li",{hasText: innerText});
        await expect(locator).toHaveClass("completed")
    }
    async checkAllCompleted(): Promise<void> {
        const allTask = await this.taskLocator.all();
        for (const task of allTask) {
            expect(task).toHaveClass("completed");
        }
    }
}