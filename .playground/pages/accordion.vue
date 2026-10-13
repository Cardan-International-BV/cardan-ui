<script setup lang="ts">
useHead({ title: 'Accordion pattern' });

const isAccordionDetailsOpen = ref(false);
const isAccordionOpen = ref(false);
</script>

<template>
  <div class="demo-page details">
    <h1>Accordion pattern</h1>

    <blockquote>
    <p class="fs-lg">
      An accordion is a vertically stacked set of interactive headings that each
      contain a title, content snippet, or thumbnail representing a section of
      content. The headings function as controls that enable users to reveal or
      hide their associated sections of content.
    </p>

    <p class="fs-sm mbe-2 c-grey-text">
      Source:
      <Button
        label="ARIA Design Patterns"
        to="https://www.w3.org/WAI/ARIA/apg/patterns/accordion"
        variant="link"
        target="_blank"
      />
    </p>
    </blockquote>

    <div class="details-demo-cols">
      <Card>
        <h2>AccordionDetails</h2>

        <p class="c-grey-text">This component uses the native <code>{{ `<details>` }}</code> and <code>{{ `<summary>` }}</code> elements.</p>

        <AccordionDetails :open="isAccordionDetailsOpen" name="demo-panels">
          <template #trigger>Accordion with HTML</template>
          <template #content>
            <p>
              An accordion is a vertically stacked set of interactive headings
              that each contain a title, content snippet, or thumbnail
              representing a section of content. The headings function as
              controls that enable users to reveal or hide their associated
              sections of content. Accordions are commonly used to reduce the
              need to scroll when presenting multiple sections of content on a
              single page.
            </p>
          </template>
        </AccordionDetails>

        <AccordionDetails :open="isAccordionDetailsOpen" name="demo-panels">
          <template #trigger>Accordion with HTML</template>
          <template #content>
            <p>
              An accordion is a vertically stacked set of interactive headings
              that each contain a title, content snippet, or thumbnail
              representing a section of content. The headings function as
              controls that enable users to reveal or hide their associated
              sections of content. Accordions are commonly used to reduce the
              need to scroll when presenting multiple sections of content on a
              single page.
            </p>
          </template>
        </AccordionDetails>

        <AccordionDetails :open="isAccordionDetailsOpen" name="demo-panels">
          <template #trigger>Accordion with HTML</template>
          <template #content>
            <p>
              An accordion is a vertically stacked set of interactive headings
              that each contain a title, content snippet, or thumbnail
              representing a section of content. The headings function as
              controls that enable users to reveal or hide their associated
              sections of content. Accordions are commonly used to reduce the
              need to scroll when presenting multiple sections of content on a
              single page.
            </p>
          </template>
        </AccordionDetails>

        <p class="c-grey-text">Give multiple components the same <code>name</code> attribute to only open one at a time.</p>
      </Card>

      <Card>
        <h2>Accordion</h2>

        <p class="c-grey-text">Custom accordion component that uses CSS for smooth animations.</p>


        <Accordion v-model="isAccordionOpen" arrow>
          <template #trigger>Accordion with CSS</template>

          <template #content>
            <p>
              An accordion is a vertically stacked set of interactive headings
              that each contain a title, content snippet, or thumbnail
              representing a section of content. The headings function as
              controls that enable users to reveal or hide their associated
              sections of content. Accordions are commonly used to reduce the
              need to scroll when presenting multiple sections of content on a
              single page.
            </p>
          </template>
        </Accordion>
      </Card>

      <Card>
        <h2>Accessibility Requirements</h2>
        <ul class="a11y-list">
          <li>The accordion trigger is a <code>button</code> element.</li>
          <li>
            Each accordion header button is wrapped in an element with role
            <code>heading</code>.
          </li>
          <li>
            The trigger element has the <code>aria-expanded</code> attribute.
            The value should align with the open state of the Accordion Panel.
          </li>

          <li>
            The trigger element has the <code>aria-controls</code> attribute.
            The value should refer to the ID of the Accordion Panel element.
          </li>

          <li>
            If the Accordion Panel contains focussable elements when using the <code>{{ `<Accordion>` }}</code> component, you should set <code>tabindex="-1"</code> on the focussable elements when they are hidden.
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<style>
.demo-page.details {
  .details-wrapper {
    margin-block-end: 1rem;
  }

  .details-panel,
  .accordion-panel {
    p {
      margin-block-end: 0;
    }
  }

  .details-summary {
    font-weight: var(--font-weight-semibold);
  }
}
</style>
