import { JohnSubpage, Body, TagList, Tag } from '@/components/JohnSubpage';

export default function JohnWhatHeDoesPage() {
  return (
    <JohnSubpage
      title="What does John do?"
      description="Builds things. Breaks things. Ships anyway."
    >
      <Body>
        <p>
          John builds software and weird little worlds — app blocks, city
          experiments, products that shouldn&apos;t exist but somehow do. By day
          he&apos;s in the weeds of code and community. By night he&apos;s
          negotiating with a kitten over couch territory.
        </p>
        <p>
          If you ask what he &quot;does,&quot; expect a shrug, then a 20-minute
          riff about cities, crypto rabbit holes, pinball, and whatever he&apos;s
          shipping this week.
        </p>
      </Body>
      <TagList>
        <Tag>💻 Software &amp; product</Tag>
        <Tag>🏙️ City-building experiments (Renaissance)</Tag>
        <Tag>📈 Crypto curiosity, not crypto bro cosplay</Tag>
        <Tag>🎯 Pinball, travel, events, making stuff</Tag>
      </TagList>
    </JohnSubpage>
  );
}
