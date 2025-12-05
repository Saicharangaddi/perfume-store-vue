import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CartDrawer from "../components/CartDrawer.vue";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "../stores/useCartStores";
import { createRouter, createMemoryHistory } from "vue-router";

// Mock router
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: "/checkout", name: "Checkout" }],
});

describe("CartDrawer.vue", () => {
  let cartStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    cartStore = useCartStore();
    cartStore.items = [
      { title: "Wireless Mouse", price: 999, image: "mouse.jpg" },
      { title: "Keyboard", price: 1499, image: "keyboard.jpg" },
    ];
  });

  it("renders cart items when open", () => {
    const wrapper = mount(CartDrawer, {
      props: { isOpen: true },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain("Wireless Mouse");
    expect(wrapper.text()).toContain("Keyboard");
    expect(wrapper.text()).toContain("$2498"); // total
  });

  it("shows empty message when cart is empty", () => {
    cartStore.items = [];
    const wrapper = mount(CartDrawer, {
      props: { isOpen: true },
      global: { plugins: [router] },
    });

    expect(wrapper.text()).toContain("Your cart is empty");
  });

  it("calls removeItem when Remove button is clicked", async () => {
    const spy = vi.spyOn(cartStore, "removeItem");
    const wrapper = mount(CartDrawer, {
      props: { isOpen: true },
      global: {
        plugins: [router],
        components: {
          Icon: {
            props: ["icon"],
            template: '<span :data-icon="icon" />',
          },
        },
      },
    });

    const removeButtons = wrapper.findAll("button");
    const removeBtn = removeButtons.find((btn) =>
      btn.text().includes("Remove")
    );
    await removeBtn.trigger("click");

    expect(spy).toHaveBeenCalledWith(0);
  });

  it("navigates to /checkout on Buy Now", async () => {
    router.push = vi.fn();
    const wrapper = mount(CartDrawer, {
      props: { isOpen: true },
      global: { plugins: [router] },
    });

    const buyNowBtn = wrapper.get('button:has-text("Buy Now")');
    await buyNowBtn.trigger("click");

    expect(router.push).toHaveBeenCalledWith("/checkout");
  });
});
