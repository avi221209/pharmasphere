import drugsData from '../data/drugs.json';
import diseasesData from '../data/diseases.json';
import drugClassesData from '../data/drugClasses.json';

export function searchAll(query) {
  if (!query || query.trim().length < 1) return { drugs: [], diseases: [] };
  const q = query.toLowerCase().trim();

  const drugs = drugsData.filter(
    (d) =>
      d.genericName.toLowerCase().includes(q) ||
      d.brandNames.some((b) => b.toLowerCase().includes(q)) ||
      d.drugClassName.toLowerCase().includes(q) ||
      d.shortUse.toLowerCase().includes(q)
  );

  const diseases = diseasesData.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.summary.toLowerCase().includes(q)
  );

  return { drugs, diseases };
}

export function getDrugsByClass(classId) {
  return drugsData.filter((d) => d.drugClass === classId);
}

export function getDrugById(id) {
  return drugsData.find((d) => d.id === id) || null;
}

export function getDiseaseBySlug(slug) {
  return diseasesData.find((d) => d.slug === slug || d.id === slug) || null;
}

export function getDrugClassById(id) {
  return drugClassesData.find((c) => c.id === id) || null;
}

export function getRelatedDrugs(drug) {
  return drugsData
    .filter((d) => d.drugClass === drug.drugClass && d.id !== drug.id)
    .slice(0, 4);
}

export function getTrendingDrugs() {
  return drugsData.filter((d) => d.isTrending);
}

export function getNewDrugs() {
  return drugsData.filter((d) => d.isNew);
}

export function getAllDrugs() {
  return drugsData;
}

export function getAllDiseases() {
  return diseasesData;
}

export function getAllDrugClasses() {
  return drugClassesData;
}
