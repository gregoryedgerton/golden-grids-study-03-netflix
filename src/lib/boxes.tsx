import type { ReactNode } from "react";
import { Fit } from "./fit";
import { ExpandedCell, type ExpandGroup } from "./expand";

/**
 * What goes inside a copy slot: a label, a line of type fitted to the
 * box, optional body copy, and a foot with a source and a More control that
 * expands the slot to a fuller passage. Ported from Study 04, in this
 * study's register: the card is the reference's, the fit is ours.
 */
export function Fact({
  label, children, fitClass, min, max, body, source, align, spoken, expand, link,
}: {
  label?: string;
  children: ReactNode;
  fitClass?: string;
  min?: number;
  max?: number;
  body?: ReactNode;
  source?: string;
  align?: "top" | "end";
  /** Spoken form, when the visible line does not read aloud as written. */
  spoken?: string;
  expand?: { group: ExpandGroup; slotKey: string; title: string; full: ReactNode; source?: string };
  link?: { href: string; label: string; aria?: string };
}) {
  return (
    <>
      <div className="box">
        {label && <p className="box__label">{label}</p>}
        <div className={`box__fit${align ? ` box__fit--${align}` : ""}`}>
          <Fit as="p" className={fitClass} min={min ?? 8} max={max} ariaLabel={spoken}>{children}</Fit>
        </div>
        {body && <div className="box__body">{body}</div>}
        {(source || expand || link) && (
          <div className="box__foot">
            {source && <span className="box__source">{source}</span>}
            {link && <a className="more more--link" href={link.href} aria-label={link.aria}>{link.label}</a>}
            {expand && <button className="more" aria-label={`More: ${expand.title}`} {...expand.group.triggerProps(expand.slotKey)}>More</button>}
          </div>
        )}
      </div>
      {expand && expand.group.isOpen(expand.slotKey) && (
        <ExpandedCell id={expand.group.panelId(expand.slotKey)} title={expand.title} onClose={expand.group.close} closeRef={expand.group.closeRef}>
          {expand.full}
          {expand.source && <p className="cell__source">{expand.source}</p>}
        </ExpandedCell>
      )}
    </>
  );
}
