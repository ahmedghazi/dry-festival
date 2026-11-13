colorSwatch:
/_ v1 colors palette _/
black: #000000;
gray-50: #dde0de;
gray-100: #c5c5c5;
blue-50: #84b0c5;
blue-100: #5098ec;
blue-200: #0000ed;
red-50: #e87568;
red-100: #ff4b65;
pink-50: #ff7cf2;
pink-100: #ff47f2;
lime-100: #83a613;
green-100: #268b09;
yellow-100: #ffff26;
purple-100: #6b33e1;

# BlockContent

- strong
- links
- newsletterForm

# CardText

- title: String
- text: BlockContent
- footerText: String
- color: string

# TextUI

- title: String
- subtitle: String
- text: BlockContent

# listCardsImageUI

- title: String
- text: BlockContent
- items: Array<CardText>
- image: Image

# DryWater

- text: BlockContent

# FormUI

- image: Image
- to: string

# GridCardTextUI

- title: String
- subtitle: String
- text: BlockContent
- items: Array<CardText>

# ImageTextUI

- image: Image
- title: String
- subtitle: String
- text: BlockContent
- direction: ltr | rtl

# NewsletterUI

- title: String
- text: BlockContent

# TextSplit

- texts: Array<BlockContent>
- image: Image
- footerText: String
