export const seo = `
	...,
	metaImage{
		asset->{
			url
		}
	}
`;

export const blockContent = `
	...,

	markDefs[] {
		...,
		_type == "linkInternal" => {
			...,
			reference->,
		}
	}
`;

export const image = `
	asset->{
		...,
		url,
		extension,
		mimeType
	},
	alt,
	caption,
`;

export const cardText = `
	...,
	text[]{
		${blockContent}
	}
`;

export const dryWaterUI = `
	_type == 'dryWaterUI' => {
		...,
		text[]{
			${blockContent}
		}
	}
`;

export const textUI = `
  _type == 'textUI' => {
    ...,
		text[]{
			${blockContent}
		}
  }
`;

export const formUI = `
	_type == 'formUI' => {
		...,
		image{
			${image}
		}
	}
`;

export const gridCardTextUI = `
	_type == 'gridCardTextUI' => {
		...,
		text[]{
			${blockContent}
		},
		items[]{
			${cardText}
		}
	}
`;

export const imageTextUI = `
	_type == 'imageTextUI' => {
		...,
		image{
			${image}
		},
		text[]{
			${blockContent}
		}
	}
`;

export const listCardsImageUI = `
	_type == 'listCardsImageUI' => {
		...,
		text[]{
			${blockContent}
		},
		items[]{
			${cardText}
		},
		image{
			${image}
		}
	}
`;

export const newsletterUI = `
	_type == 'newsletterUI' => {
		...,
		text[]{
			${blockContent}
		}
	}
`;

export const textSplitUI = `
	_type == 'textSplitUI' => {
		...,
		texts[]{
			...,
			text[]{
				${blockContent}
			}
		},
		image{
			${image}
		}
	}
`;

export const modules = `
  ...,
	${dryWaterUI},
	${textUI},
	${formUI},
	${gridCardTextUI},
	${listCardsImageUI},
	${textSplitUI},
	${imageTextUI},
	${newsletterUI}
`;
