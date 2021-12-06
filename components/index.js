import { getFiles, readFile } from '../file_helpers.js';
import classnames from 'classnames';

export default async (hbs) => {
    let partials = {};

    for await (let file of getFiles('./components/partials')) {
        let content = await readFile(file.path);
        let name = file.name;
        hbs.registerPartial(name, content);
        partials[name] = hbs.compile(hbs.partials[name]);
    }

    hbs.registerHelper('badge', ({ hash }) => {
        const { type = "default", caption } = hash;
        const cls = { "default": "bg-secondary", "danger": "bg-danger" }[type];
        return partials.badge({ cls, caption: caption });
    });

    hbs.registerHelper('button', ({ hash, fn }) => {
        const { additionalClasses, cta, ...additionalAttributes } = hash;
        const cls = classnames("btn", additionalClasses, { "btn-primary": cta, "btn-secondary": !cta });
        return partials.button({ cls, additionalAttributes, content: fn() })
    });

    hbs.registerHelper('card', ({ hash, fn }) => {
        let { heading, headingLevel, footer, href } = hash;
        heading = heading || fn.partials.heading();
        const headerTag = `h${headingLevel}`;
        return partials.card({ heading, headerTag, footer, href, content: fn() });
    });

    hbs.registerHelper('list', ({ hash, fn }) => {
        return "There is no point demonstrating this since there is no option to combine view based HTML with custom data structures in view."
    });

    hbs.registerHelper('mhSection', ({ hash, fn }) => {
        let headingLevel = (hash.parentHeadingLevel || 0) + 1;
        return fn({ headingLevel });
    });

    hbs.registerHelper('mhHeading', ({ hash, fn }) => {
        const headerTag = `h${hash.headingLevel}`;
        return `<${headerTag}>${fn()}</${headerTag}>`;
    });

    hbs.registerHelper('fieldGroup', ({ hash }) => {
        let { type, id, label, name, value, error } = hash;
        let inputClass = classnames('form-control', error ? 'is-invalid' : '');
        return partials.fieldGroup({ type, id, label, name, value, error, inputClass });
    });
}
