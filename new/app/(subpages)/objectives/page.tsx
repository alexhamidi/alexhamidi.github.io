import ObjectivesGraph from "../../components/ObjectivesGraph";

export default function Objectives() {
  return (
    <article className="max-w-[800px] mx-auto w-full">
      <p className="mb-8 leading-relaxed text-gray-700">
        This is a hierarchical map of my core objectives and the principles that
        support them. Click on any node with a "+" to expand and explore the
        underlying goals that contribute to higher-level aspirations.
      </p>
      <ObjectivesGraph />
    </article>
  );
}
