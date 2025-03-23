import { expect, Locator, Page } from "@playwright/test";
import { Task } from "../organisms/Task";

export class TodoPage {
  private readonly url = "https://todo-app.tallinn-learning.ee";
  readonly page: Page;
  readonly newTaskInputField: Locator;
  readonly footer: Locator;
  readonly todoList: Locator;
  readonly tasks: Task;
  readonly activeButton: Locator;
  readonly completedButton: Locator;
  readonly clearCompletedButton: Locator;
  readonly allTasksButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTaskInputField = page.getByTestId("text-input");
    this.footer = page.getByTestId("footer");
    this.todoList = page.getByTestId("todo-list");
    this.tasks = new Task(this.todoList);
    this.activeButton = page.getByText("Active");
    this.completedButton = this.page.locator('[href=\"#/completed\"]');
    this.clearCompletedButton = page.getByText("Clear completed");
    this.allTasksButton = page.getByText("All");
  }
  async open(): Promise<void> {
    await this.page.goto(this.url);
  }
  async createTask(text: string): Promise<void> {
    await this.newTaskInputField.fill(text);
    await this.newTaskInputField.press("Enter");
  }

  async checkTaskCount(expected_count: number): Promise<void> {
    const count = await this.tasks.taskLocator.count();
    expect(count).toBe(expected_count);
  }
  async checkActiveButton(): Promise<void> {
    await this.activeButton.click();
  }

  async checkClearCompletedButton(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  async checkCompletedButton(): Promise<void> {
    await this.completedButton.click();
  }
}
