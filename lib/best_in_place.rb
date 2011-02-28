module BestInPlace
  module BestInPlaceHelpers
    def best_in_place(object, field, opts = {})
      opts[:type] ||= :input
      opts[:collection] ||= []
      field = field.to_s
      value = opts[:value] || object.send(field) || ""
      collection = nil
      if opts[:type] == :select && !opts[:collection].blank?
        v = object.send(field)
        value = Hash[opts[:collection]][!!(v =~ /^[0-9]+$/) ? v.to_i : v]
        collection = opts[:collection].to_json
      end
      if opts[:type] == :checkbox
        fieldValue = !!object.send(field)
        if opts[:collection].blank? || opts[:collection].size != 2
          opts[:collection] = ["No", "Yes"]
        end
        value = fieldValue ? opts[:collection][1] : opts[:collection][0]
        collection = opts[:collection].to_json
      end
      out = "<span class='best_in_place'"
      out << " id='best_in_place_#{object.class.to_s.gsub("::", "_").underscore}_#{field}'"
      out << " data-url='#{opts[:path].blank? ? url_for(object).to_s : url_for(opts[:path])}'"
      out << " data-object='#{object.class.to_s.gsub("::", "_").underscore}'"
      out << " data-collection='#{collection}'" unless collection.blank?
      out << " data-attribute='#{field}'"
      out << " data-sanitize='#{!!opts[:sanitize]}'" unless opts[:sanitize].nil?
      out << " data-type='#{opts[:type].to_s}'"
      # output the rest of the given options as strings
      (opts.keys - [:path, :collection, :sanitize, :type]).each do |opt|
        out << " data-#{opt}='#{opts[opt]}'" unless opts[opt].blank?
      end
      out << ">"
      out << value.to_s
      out <<  "</span>"
      raw(out)
    end
  end
end


ActionView::Base.send(:include, BestInPlace::BestInPlaceHelpers)
