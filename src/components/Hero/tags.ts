// Constants are currently placed here because, for now, all the enums are specific to the Hero Banner.
// If this will become a generic file, it will need to be moved

export type ReplaceableTag = {
  tag: string;
  replace_text: string;
  url: string;
  replaceText: (input: string) => string;
};

export const REPLACE_TAGS: Record<string, ReplaceableTag> =  {
    RATINGS: {
        tag: "{{ratings}}",
        replaceText: function(inputString) {
            return inputString.replace(this.tag, this.replace_text.replace("<url>", this.url));
        },
        replace_text: "<replace with number> Ratings",
        url: ""
    },
    REVIEWS: {
        tag: "{{reviews}}",
        replaceText: function(inputString) {
            // TODO: Add API here if needed

            return inputString.replace(this.tag, this.replace_text.replace("<url>", this.url));
        },
        replace_text: "<a href='<url>'> 1000 Reviews </a>",
        url: "https://www.google.com"
    },
    STARS: {
        tag: "{{stars}}",
        replaceText: function(inputString) {
            return inputString.replace(this.tag, this.replace_text.replace("<url>", this.url));
        },
        replace_text: "<a href='<url>'> ***** </a>",
        url: ""
    },
}