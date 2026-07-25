import { JohnSubpage, Body, TagList, Tag } from '@/components/JohnSubpage';

export default function JohnKindOfManPage() {
  return (
    <JohnSubpage
      title="What kind of man is John?"
      description="Short answer: a walking contradiction with a cat."
    >
      <Body>
        <p>
          The kind who will roast your dating app and still show up with snacks.
          Emotionally self-aware enough to know he&apos;s a mess. Not self-aware
          enough to stop collecting plants he might forget to water.
        </p>
        <p>
          Silly faces are a love language. So is remembering what you ordered last
          time. He&apos;ll ghost a group chat and then somehow be the one who
          plans the trip.
        </p>
      </Body>
      <TagList>
        <Tag>🐱 Soft for animals, hard on bad coffee</Tag>
        <Tag>🧢 Backward-hat energy, forward plans</Tag>
        <Tag>💔 Will get rejected twice and still text first</Tag>
        <Tag>🛠️ Builder who treats life like a prototype</Tag>
      </TagList>
    </JohnSubpage>
  );
}
