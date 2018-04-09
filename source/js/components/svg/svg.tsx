import * as React	from 'react';

import './styles/b_icon.scss'

/** Simple wrapper to render SVG from global SVG bundle
 *  This implementation use xlink:href tag for rendering images: there is big SVG file assembled during build, which
 *  have all required icons as symbols. This component references to this symbols by using `icon` property.
 *  Resulting SVG is something like that:
 *  <svg class="bIcon"><use xlink:href="#icon_key"></use></svg>
 */

interface SVGProps {
    handleClick?: () => void
    icon: string
    extraClassName?: string
    title?: string
}

export class SVG extends React.Component<SVGProps> {
    getStyle() {
        return this.props.extraClassName ? 'bIcon ' + this.props.extraClassName : 'bIcon';
    }
    getIconHref() {
        return '#' + this.props.icon;
    }
    getTitle() {
        return typeof this.props.title !== 'undefined' ? this.props.title : '';
    }
    render() {
        return (
            <svg
                onClick={this.props.handleClick}
                className={this.getStyle()}
            >
                <use xlinkHref={this.getIconHref()}>
                    <title>{this.getTitle()}</title>
                </use>
            </svg>
        );
    }
}

