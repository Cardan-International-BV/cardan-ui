<script setup lang="ts">
useHead({ title: 'Tabs pattern' });

const tabs = [
  {
    value: 'a',
    label: 'Accessibility requirements',
    icon: 'material-symbols:accessibility-new-rounded',
  },
  {
    value: 'b',
    label: 'Overflowing content',
    icon: 'material-symbols:format-text-overflow-rounded',
  },
];

const activeTab = ref('a');

const tabsFontSize = ref<TabsSize>('sm');
const tabsIconSize = ref<FontSize>('md');
const tabsVariant = ref<TabsVariant>('default');

const tabsFontSizes: { value: TabsSize; label: string }[] = [
  {
    value: 'md',
    label: 'md',
  },
  {
    value: 'sm',
    label: 'sm',
  },
  {
    value: 'xs',
    label: 'xs',
  },
];

const tabsIconSizes: { value: FontSize; label: string }[] = [
  {
    value: 'xl',
    label: 'xl',
  },
  {
    value: 'lg',
    label: 'lg',
  },
  {
    value: 'md',
    label: 'md',
  },
  {
    value: 'sm',
    label: 'sm',
  },
  {
    value: 'xs',
    label: 'xs',
  },
];

const tabsVariants: { value: TabsVariant; label: string }[] = [
  {
    value: 'default',
    label: 'default',
  },
  {
    value: 'minimal',
    label: 'minimal',
  },
];
</script>

<template>
  <div class="demo-page tabs">
    <div class="section-topbar">
      <h1>Tabs pattern</h1>

      <Popover icon="material-symbols:settings-rounded" :max-width="480">
        <div class="popover-settings-content">
          <h2>Props</h2>
          <div class="props-wrapper">
            <Select
              v-model="tabsFontSize"
              :options="tabsFontSizes"
              size="sm"
              label="fontSize"
            />
            <Select
              v-model="tabsIconSize"
              :options="tabsIconSizes"
              size="sm"
              label="iconSize"
            />
            <Select
              v-model="tabsVariant"
              :options="tabsVariants"
              size="sm"
              label="variant"
            />
            <code
              >{{`<Tabs
                font-size="${tabsFontSize}"
                icon-size="${tabsIconSize}"
                variant="${tabsVariant}"
              />`}}</code
            >
          </div>
        </div>
      </Popover>
    </div>

    <blockquote>
      <p class="fs-md">
        Tabs are a set of layered sections of content, known as tab panels, that
        display one panel of content at a time. Each tab panel has an associated
        tab element, that when activated, displays the panel. The list of tab
        elements is arranged along one edge of the currently displayed panel,
        most commonly the top edge.
      </p>

      <p class="fs-sm mbe-2 c-grey-text">
        Source:
        <Button
          label="ARIA Design Patterns"
          to="https://www.w3.org/WAI/ARIA/apg/patterns/tabs"
          variant="link"
          target="_blank"
        />
      </p>
    </blockquote>

    <Card>
      <Tabs
        v-model="activeTab"
        :font-size="tabsFontSize"
        :icon-size="tabsIconSize"
        :variant="tabsVariant"
        :tabs="tabs"
        tab-list-label="Demo tabs"
      >
        <template #a>
          <ul class="a11y-list">
            <li>
              It is recommended that tabs activate automatically when they
              receive focus.
            </li>

            <li>
              When the Tab List is focussed, the <kbd>Tab</kbd> key should move
              focus to the Tab Panel.
            </li>

            <li>
              When the Tab List is focussed, the
              <kbd>
                <Icon name="material-symbols:arrow-right-alt-rounded" />
              </kbd>
              key moves focus to the next tab.
            </li>

            <li>
              When the Tab List is focussed, the
              <kbd>
                <Icon name="material-symbols:arrow-left-alt-rounded" />
              </kbd>
              key moves focus to the previous tab.
            </li>

            <li>
              Each element that serves as a tab has <code>role="tab"</code>.
            </li>

            <li>
              The element that serves as the container for the set of tabs has
              <code>role="tablist"</code>.
            </li>

            <li>
              The tablist element has a label, either visible, or for screen
              readers.
            </li>

            <li>
              The elements that contains the content for a tab have
              <code>role="tabpanel"</code>.
            </li>

            <li>
              The active tab element has <code>aria-selected</code> set to true
              and all other tab elements to false.
            </li>

            <li>
              Each tab has an <code>aria-controls</code> attribute referring to
              its associated tabpanel element.
            </li>

            <li>
              Each element with role tabpanel has the property
              <code>aria-labelledby</code> referring to its associated tab
              element.
            </li>
          </ul>
        </template>

        <template #b>
          <div class="overflow-content" tabindex="0">
            <p>
              This tab panel can be used to test keyboard accessibility for
              overflowing content.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              sed nisi voluptatem perferendis facilis ab, aperiam mollitia neque
              deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero
              fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita
              repellat consequuntur officiis sequi illo provident ducimus
              voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum
              necessitatibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              sed nisi voluptatem perferendis facilis ab, aperiam mollitia neque
              deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero
              fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita
              repellat consequuntur officiis sequi illo provident ducimus
              voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum
              necessitatibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              sed nisi voluptatem perferendis facilis ab, aperiam mollitia neque
              deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero
              fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita
              repellat consequuntur officiis sequi illo provident ducimus
              voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum
              necessitatibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              sed nisi voluptatem perferendis facilis ab, aperiam mollitia neque
              deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero
              fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita
              repellat consequuntur officiis sequi illo provident ducimus
              voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum
              necessitatibus.
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
              fuga. Nihil iste enim expedita repellat consequuntur officiis
              sequi illo provident ducimus voluptatem aliquam corrupti sapiente
              adipisci ex, fugit rerum necessitatibus. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Alias, magnam? Ad aperiam
              quaerat adipisci atque dolores? Sapiente, distinctio accusantium,
              laudantium numquam ut perferendis laborum harum molestias magnam
              saepe eius! Molestias. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Assumenda accusamus illum voluptas soluta error
              blanditiis facere expedita nihil hic possimus rem repellendus,
              vero a iste nesciunt. Aperiam veritatis modi sint. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Architecto nisi
              perferendis ad laboriosam culpa eaque asperiores tenetur earum, id
              saepe cupiditate laudantium! Saepe obcaecati autem, quaerat
              nostrum laborum unde perferendis!
            </p>
          </div>
        </template>
      </Tabs>
    </Card>
  </div>
</template>

<style>
.demo-page.tabs {
  .card {
    padding-inline-end: 4rem;
  }

  .overflow-content {
    max-height: 36svh;
    overflow: auto;

    &:focus-visible {
      outline-offset: 0.5rem;
      border-radius: var(--radius-xs);
      outline: 2px solid var(--focus-color);
    }
  }
}
</style>
